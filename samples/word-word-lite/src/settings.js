/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

// Should be stored securely with KMS or as a secure environment variable on your lambda
// See https://github.com/alexa-games/skills-gameon-sdk-js/blob/master/README.md#gameon-api-secret-management
const gameOnApiKey = process.env.gameOnApiKey;

// Preferable to store the following settings as AWS Lambda environment variables
const matchId = process.env.matchId || '<<Enter gameOn match ID>>';
const tournamentId = process.env.tournamentId || '<<Enter gameOn tournament ID>>';

// Required for GameOn. Value must be set to 'development' or 'release'
const appBuildType = process.env.appBuildType || '<<Enter gameOn appBuildType>>';

// Base url for the player avatars. See https://github.com/alexa-games/skills-gameon-sdk-js/blob/master/README.md#avatar-generation
// Cannot be empty string. Passing in any other value will allow the leaderboard to render,
// but will display blank placeholders.
const gameAvatarBaseUrl = process.env.gameAvatarBaseUrl || '<<Enter avatar Base URL>>';

// Background image for the leaderboard template
// Recommended minimum size: 1280x800px
// Cannot be empty string. Passing in any other value will allow the leaderboard to render,
// but will display a blank white background
const leaderboardBackgroundImageUrl = process.env.leaderboardBackgroundImageUrl || '<<Enter LeaderBoard Background URL>>';

// Top n places to show on the leaderboard
const topNleaderboardItemCount = process.env.topNleaderboardItemCount || 5;
// Number of players to render before and after current player
const playerNeighborsCount = process.env.playerNeighborsCount || 1;
// Number of avatars that have been generated
// See https://github.com/alexa-games/skills-gameon-sdk-js/blob/master/README.md#avatar-generation
const numberOfUniqueAvatars = process.env.numberOfUniqueAvatars || 50;

module.exports = {
    matchId,
    tournamentId,
    appBuildType,
    gameOnApiKey,
    gameAvatarBaseUrl,
    leaderboardBackgroundImageUrl,
    topNleaderboardItemCount,
    playerNeighborsCount,
    numberOfUniqueAvatars
};
