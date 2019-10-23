/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

const sdk = require('@alexa-games/skills-gameon-sdk');
const settings = require('./settings.js');

const defaultClient = new sdk.SkillsGameOnApiClient();
const generator = sdk.PlayerProfileGeneratorBuilder.getGenerator({
    locale: 'en-US',
    avatarBaseUrl: settings.gameAvatarBaseUrl,
    numberOfUniqueAvatars: settings.numberOfUniqueAvatars
});

/**
 * Initializes a new player with added profile info (name, avatar, color)
 *
 * @param {SkillsGameOnApiClient} [client=defaultClient]
 * @returns {AugmentedPlayer}
 */
async function newPlayer(client = defaultClient) {
    let alexaPlayer = await client.initializeNewAugmentedPlayer({
        gameApiKey: settings.gameOnApiKey,
        appBuildType: settings.appBuildType,
        playerProfileGenerator: generator
    });
    await client.enterTournamentForPlayer({
        tournamentId: settings.tournamentId,
        player: alexaPlayer
    });
    return alexaPlayer;
}

/**
 * Looks up the player profile by the external player id
 * @param {String} externalPlayerId
 * @returns {PlayerProfile}
 */
function lookupPlayerProfile(externalPlayerId) {
    const profile = generator.getPlayerProfileFromId(externalPlayerId);
    return profile;
}

/**
 * Enter the match for a player. Assumes match and tournament are persistent / eternal.
 * This is the most simple use case. If you are implementing recurring leaderboards e.g. daily or monthly,
 * it is recommended to use SkillsGameOnApiClient.getTournamentsByTitle to retrieve the ephemeral tournamentId
 * and SkillsGameOnApiClient.getMatchListForPlayer to retrieve the ephemeral matchId.
 *
 * @param {Player} alexaPlayer
 * @param {SkillsGameOnApiClient} [client=defaultClient]
 * @returns {EnterMatchResponse}
 */
async function enterMatch(alexaPlayer, client = defaultClient) {
    return await client.enterMatchForPlayer({
        matchId: settings.matchId,
        player: alexaPlayer
    });
}

/**
 * Submits score for player. Ensures session has not expired before submission.
 * NOTE: stats can also be submitted in the sdk method, but we are not showcasing that here.
 *
 * @param {Player} alexaPlayer
 * @param {Number} score
 * @param {SkillsGameOnApiClient} [client=defaultClient]
 * @returns {Player}
 */
async function submitScore(alexaPlayer, score, client = defaultClient) {
    await client.submitScoreForPlayer({
        matchId: settings.matchId,
        submitScoreRequest: { score },
        player: alexaPlayer,
        ensureMatchEntered: true
    });
    return alexaPlayer;
}

/**
 * Retrieves the player's PlayerScore. The PlayerScore is scoped to a particular matchId and contains the
 * players rank, score, and ordinalRank e.g. first, second, third, etc.
 *
 * @param {Player} alexaPlayer
 * @param {SkillsGameOnApiClient} [client=defaultClient]
 * @returns {PlayerScore}
 */
async function getPlayerScore(alexaPlayer, client = defaultClient) {
    return await client.getPlayerScore(
        settings.matchId,
        alexaPlayer);
}

/**
 * Refresh a player session by retrieving a new sessionId and sessionApiKey from GameOn.
 * If the session has not expired, then do nothing.
 *
 * @param {Player} alexaPlayer
 * @param {SkillsGameOnApiClient} [client=defaultClient]
 * @returns {Player}
 */
async function refreshPlayerSession(alexaPlayer, client = defaultClient) {
    alexaPlayer = await client.refreshPlayerSession({
        gameApiKey: settings.gameOnApiKey,
        appBuildType: settings.appBuildType,
        player: alexaPlayer
    });
    return alexaPlayer;
}

/**
 * Retrieve a rendered leaderboard APL document. This function assumes that you always want the score and rank
 * stored with GameOn. If you configure the leaderboard to only persist the best score, but want to display how the
 * player performed in this particular instance, you can use the SkillsGameOnApiClient.renderLeaderboard and pass in
 * an AugmentedPlayer with the desired PlayerScore.
 *
 * @param {Player} alexaPlayer
 * @param {SkillsGameOnApiClient} [client=defaultClient]
 * @returns Alexa APL document directive
 */
async function getLeaderboard(alexaPlayer, client = defaultClient) {
    const leaderboard = await client.getCombinationLeaderboards({
        matchId: settings.matchId,
        topScoresLimit: settings.topNleaderboardItemCount,
        playerNeighborsLimit: settings.playerNeighborsCount,
        player: alexaPlayer
    });
    const currentScore = await client.getPlayerScore(
      settings.matchId,
        alexaPlayer);
    alexaPlayer.score.ordinalRank = currentScore.ordinalRank;
    alexaPlayer.score.rank = currentScore.rank;
    alexaPlayer.score.score = currentScore.score;
    const renderOptions = { backgroundImageUrl: settings.leaderboardBackgroundImageUrl };
    return sdk.renderLeaderboard(alexaPlayer, leaderboard, renderOptions, generator);
}
module.exports = {
    newPlayer,
    lookupPlayerProfile,
    submitScore,
    getPlayerScore,
    enterMatch,
    getLeaderboard,
    refreshPlayerSession
};
