const Alexa = require('ask-sdk-core');
const WordConstants = require("./words.js");
const GameOn = require("./gameOn.js");

const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
const persistenceAdapter = new DynamoDbPersistenceAdapter({
    tableName: 'SampleGameOnSkill',
    createTable: true
});

const PlayGameRequestHandler = {
    canHandle(handlerInput) {
        this.handlerInput = handlerInput;
        return this.requestType === 'IntentRequest' && this.intentName === 'PLAY_GAME_INTENT';
    },
    async handle(handlerInput) {
        let utteranceCount, playerRank, slots;
        this.handlerInput = handlerInput;
        const attributes = this.getSessionAttributesManager;
        const player = await this.getPersistentAttributesManager;
        slots = this.slots;
        let slotArray = Object.keys(slots);
        let input = [];
        slotArray.forEach(function (key) {
            let slotValue = slots[key].value;
            if (typeof slotValue !== 'undefined') {
                input.push(slotValue);
            }
        })
        utteranceCount = input.reduce((mem, utterance) => {
            if (attributes.currentWord === utterance.toLowerCase()) {
                return mem + 1;
            }
            return mem;
        }, 0);
        await GameOn.submitScore(player, utteranceCount);
        playerRank = await GameOn.getPlayerRank(player);
        const speechText = `You have said <voice name="Joey"> <break time=".1s"/> ${attributes.currentWord} </voice> <break time=".1s"/> ${utteranceCount} times. Your current rank is <break time=".1s"/> ${playerRank} . Your next word is <voice name="Joey"> <break time=".1s"/> ${attributes.nextWord} </voice>`;
        const repromptText = `Your next word is <break time=".1s"/> ${attributes.nextWord}`;
        const displayText = `You have said ${attributes.currentWord} ${utteranceCount} times.Your current rank is ${playerRank}.Your next word is ${attributes.nextWord}`;
        attributes.currentWord = attributes.nextWord;
        attributes.nextWord = WordConstants.getWord();
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .withSimpleCard('Word Repeat', displayText)
            .getResponse();
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        this.handlerInput = handlerInput;
        return this.requestType === 'LaunchRequest';
    },
    async handle(handlerInput) {
        this.handlerInput = handlerInput;
        const attributes = this.getSessionAttributesManager;
        let player = await this.getPersistentAttributesManager;
        if (Object.keys(player).length == 0) {
            player = await GameOn.newPlayer();
            this.setPersistentAttributes(player);
            await this.savePersistentAttributes();
        }
        attributes.currentWord = WordConstants.getWord();
        attributes.nextWord = WordConstants.getWord();
        this.setSessionAttributes(attributes);
        const playerName = await GameOn.uniquePlayerGenerator(player);
        await GameOn.submitScore(player, 0);
        const speechText = `Welcome to the word repetition challenge. The game where you compete to see who can say the same word most times in a row ? Your name is <break time=".1s"/> ${playerName}. When you are ready to begin, just say Alexa, and then say the word <voice name="Joey"> <break time=".1s"/> ${attributes.currentWord} </voice> as many times as possible.`;
        const repromptText = `To start just say Alexa, and then say the word <break time=".1s"/> ${attributes.currentWord} as many times as possible.`;
        const displayText = `Welcome ${playerName} to start just say Alexa, and then say the word ${attributes.currentWord} as many times as possible.`;
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .withSimpleCard('Word Repeat', displayText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        this.handlerInput = handlerInput;
        return this.requestType === 'IntentRequest' && this.intentName === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'I’ll give you a word. Simply repeat the word as many times as you can, as fast as you can, without messing up. Are you ready to play?. Say Alexa and repeat the word as many times as possible.';
        const displayText = 'To start just say Alexa, and then say the word as many times as possible.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Word Repeat', displayText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        this.handlerInput = handlerInput;
        return this.requestType === 'IntentRequest'
            && (this.intentName === 'AMAZON.CancelIntent'
                || this.intentName === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Come back soon for another round. Bye Bye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Word Repeat', speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        this.handlerInput = handlerInput;
        return this.requestType === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const LeaderboardRequestHandler = {
    canHandle(handlerInput) {
        this.handlerInput = handlerInput;
        return this.requestType === 'IntentRequest'
            && this.intentName === 'SHOW_LEADERBOARD_INTENT';
    },
    async handle(handlerInput) {
        this.handlerInput = handlerInput;
        const attributes = this.getSessionAttributesManager;
        const player = await this.getPersistentAttributesManager;
        const leaderboardDirective = await GameOn.getLeaderboard(player);
        const playerRank = await GameOn.getPlayerRank(player);
        attributes.currentWord = WordConstants.getWord();
        attributes.nextWord = WordConstants.getWord();
        this.setSessionAttributes(attributes);
        const speechText = `Your current rank is <break time=".1s"/> ${playerRank}. To continue playing , just say Alexa, and then say the word <voice name="Joey"> <break time=".1s"/> ${attributes.currentWord} </voice> as many times as possible.`;
        return handlerInput.responseBuilder
            .speak(speechText)
            .addDirective(leaderboardDirective)
            .getResponse();
    }
}

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        this.handlerInput = handlerInput;
        return this.requestType === 'IntentRequest';
    },
    handle(handlerInput) {
        const speechText = "";
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Word Repeat', speechText)
            .getResponse();
    }
};

let EventHandlerInput = {
    get requestType() {
        return this.request.type;
    },
    get intent() {
        return this.request.intent || {};
    },
    get slots() {
        return this.intent.slots;
    },
    get intentName() {
        return this.intent.name;
    },
    get input() {
        return this.handlerInput || {};
    },
    get envelope() {
        return this.handlerInput.requestEnvelope || {};
    },
    get request() {
        return this.envelope.request || {};
    },
    get getSessionAttributesManager() {
        return this.handlerInput.attributesManager.getSessionAttributes() || {};
    },
    get getPersistentAttributesManager() {
        return this.input.attributesManager.getPersistentAttributes() || {};
    },
    setSessionAttributes: async function setSessionAttributesManager(attributes) {
        await this.input.attributesManager.setSessionAttributes(attributes);
    },
    setPersistentAttributes: async function setPersistentAttributesManager(player) {
        await this.input.attributesManager.setPersistentAttributes(player);
    },
    savePersistentAttributes: async function setPersistentAttributesManager() {
        await this.input.attributesManager.savePersistentAttributes();
    }
};

Object.setPrototypeOf(LaunchRequestHandler, EventHandlerInput);
Object.setPrototypeOf(PlayGameRequestHandler, EventHandlerInput);
Object.setPrototypeOf(HelpIntentHandler, EventHandlerInput);
Object.setPrototypeOf(CancelAndStopIntentHandler, EventHandlerInput);
Object.setPrototypeOf(SessionEndedRequestHandler, EventHandlerInput);
Object.setPrototypeOf(IntentReflectorHandler, EventHandlerInput);
Object.setPrototypeOf(LeaderboardRequestHandler, EventHandlerInput);


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayGameRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        LeaderboardRequestHandler,
        IntentReflectorHandler)
    .withPersistenceAdapter(persistenceAdapter)
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
