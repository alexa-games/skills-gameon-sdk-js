const leaderboard = require("@alexa-games/skills-gameon-sdk");
const gameConstants = require("./gameConstants.js");

const PlayerProfileGeneratorBuilder = leaderboard.PlayerProfileGeneratorBuilder;
const renderLeaderboard = leaderboard.renderLeaderboard;
const defaultClient = new leaderboard.SkillsGameOnApiClient();
const match = gameConstants.match;
const tournament = gameConstants.tournament;
const env = gameConstants.env;
const gamePublicApiKey = gameConstants.gamePublicApiKey;
const gameAvatarBaseUrl = gameConstants.gameAvatarBaseUrl;
const backgroundUrl = gameConstants.leaderboardBackgroundURL;
const generator = PlayerProfileGeneratorBuilder.getGenerator({
    locale: "en-US",
    avatarBaseUrl: gameAvatarBaseUrl,
    numberOfUniqueAvatars: 50
});
const TOP_SCORES_LIMIT = 5;
const PLAYER_NEIGHBORS_LIMIT = 2;

async function newPlayer(client = defaultClient) {
    let alexaPlayer = await client.initializeNewAugmentedPlayer({
        gameApiKey: gamePublicApiKey,
        appBuildType: env,
        playerProfileGenerator: generator
    });
    await client.enterTournamentForPlayer({
        tournamentId: tournament,
        player: alexaPlayer
    });
    return alexaPlayer;
};

async function uniquePlayerGenerator(alexaPlayer) {
    const randomProfile = await generator.getPlayerProfileFromId(alexaPlayer.externalPlayerId);
    return randomProfile.name;
};

async function enterMatch(alexaPlayer, client = defaultClient) {
    await client.enterMatchForPlayer({
        matchId: match,
        player: alexaPlayer
    });
};

async function submitScore(alexaPlayer, playerScore, client = defaultClient) {
    await refreshPlayerSession(alexaPlayer);
    await client.submitScoreForPlayer({
        matchId: match,
        submitScoreRequest: { score: playerScore },
        player: alexaPlayer,
        ensureMatchEntered: true
    });
    return alexaPlayer;
};

async function getPlayerRank(alexaPlayer, client = defaultClient) {
    playerscore = await client.getPlayerScore(
        match, 
        alexaPlayer);
    return playerscore.rank;
};

async function refreshPlayerSession(alexaPlayer, client = defaultClient) {
    alexaPlayer = await client.refreshPlayerSession({
        gameApiKey: gamePublicApiKey,
        appBuildType: env,
        player: alexaPlayer
    });
    return alexaPlayer;
};

async function getLeaderboard(alexaPlayer, client = defaultClient) {
    const leaderboard = await client.getCombinationLeaderboards({
        matchId: match,
        topScoresLimit: TOP_SCORES_LIMIT,
        playerNeighborsLimit: PLAYER_NEIGHBORS_LIMIT,
        player: alexaPlayer
    });
    currentscore = await client.getPlayerScore(
        match, 
        alexaPlayer);
    alexaPlayer.score.ordinalRank = currentscore.ordinalRank;
    alexaPlayer.score.rank = currentscore.rank;
    alexaPlayer.score.score = currentscore.score;
    const renderOptions = { backgroundImageUrl: backgroundUrl };
    const playerProfileGenerator = PlayerProfileGeneratorBuilder.getGenerator({ avatarBaseUrl: gameAvatarBaseUrl });
    return renderLeaderboard(alexaPlayer, leaderboard, renderOptions, playerProfileGenerator);
};

module.exports = {
    newPlayer,
    uniquePlayerGenerator,
    submitScore,
    getPlayerRank,
    enterMatch,
    getLeaderboard
}
