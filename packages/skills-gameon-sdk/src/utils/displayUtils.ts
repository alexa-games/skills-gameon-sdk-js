/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import { GetMatchLeaderboardResponseLeaderboardItem } from '@alexa-games/gameon-sdk';
import { AugmentedPlayer, CombinationLeaderboard, PlayerScore } from '../client/skillsGameOnApiClient';
import { PlayerProfile } from '../player/playerProfile';
import { PlayerProfileGenerator } from '../player/playerProfileGenerator';
import playerRankDoc from './views/player-rank.json';

// tslint:disable-next-line: no-var-requires
const ordinal = require('ordinal');

/**
 * Displayable player for APL rendering
 */
interface DisplayablePlayer {
    score: PlayerScore;
    profile: PlayerProfile;
    isCurrentPlayer: boolean;
}

interface RenderOptions {
    /**
     * Url of the background image
     * Recommended minimum size: 1280x800px
     */
    backgroundImageUrl?: string;

    /**
     * Url of the trophy image
     * Recommended minimum size: 70x70px
     */
    trophyUrl?: string;

    /**
     * Url of the logo image
     * Recommended minimum size: 170x130px
     */
    logoImageUrl?: string;

    /**
     * Valid CSS color. Will default to #1da1a3 if not supplied
     */
    primaryColor?: string;

    /**
     * Valid CSS color. Will default to #66298f if not supplied
     */
    secondaryColor?: string;

    /**
     * Leaderboard score primary text. Will default to `You placed ${player.score.ordinalRank}!` if not supplied
     */
    scorePrimaryText?: string;

    /**
     * Leaderboard score secondary text. Will default to `${player.score.score} points` if not supplied
     */
    scoreSecondaryText?: string;
}

/**
 * @desc Renders an example leaderboard APL screen document
 *
 * @param player AugmentedPlayer
 * @param combinationLeaderboard Combination leaderboard containing top players and neighboring players
 * @param renderOptions rendering options containing image urls and colors
 * @param playerProfileGenerator Player profile generator
 * @return Alexa APL document directive
 */
export function renderLeaderboard(player: AugmentedPlayer,
                                  combinationLeaderboard: CombinationLeaderboard,
                                  renderOptions: RenderOptions,
                                  playerProfileGenerator: PlayerProfileGenerator): any {
    const leaderboard: DisplayablePlayer[] = [];
    for (const item of combinationLeaderboard.topNLeaderboard) {
        leaderboard.push({
            isCurrentPlayer: !!item.isCurrentPlayer,
            profile: getPlayerProfile(item, playerProfileGenerator),
            score: getPlayerScore(item)
        });
    }
    for (const item of combinationLeaderboard.neighborLeaderboard) {
        leaderboard.push({
            isCurrentPlayer: !!item.isCurrentPlayer,
            profile: getPlayerProfile(item, playerProfileGenerator),
            score: getPlayerScore(item)
        });
    }
    if (!renderOptions.primaryColor) {
        renderOptions.primaryColor = '#1da1a3';
    }
    if (!renderOptions.secondaryColor) {
        renderOptions.secondaryColor = '#66298f';
    }
    if (!renderOptions.scorePrimaryText) {
        renderOptions.scorePrimaryText = `You placed ${player.score.ordinalRank}!`;
    }
    if (!renderOptions.scoreSecondaryText) {
        renderOptions.scoreSecondaryText = `${player.score.score} points`;
    }

    return {
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: playerRankDoc,
        datasources: {
            data: {
                leaderboard,
                player,
                renderOptions
            }
        }
    };
}

export function getPlayerProfile(item: GetMatchLeaderboardResponseLeaderboardItem, playerProfileGenerator: PlayerProfileGenerator): PlayerProfile {
    return item.externalPlayerId ?
        playerProfileGenerator.getPlayerProfileFromId(item.externalPlayerId) : playerProfileGenerator.getRandomPlayerProfile();
}

export function getPlayerScore(item: GetMatchLeaderboardResponseLeaderboardItem): PlayerScore {
    return {rank: item.rank || 0, score: item.score, ordinalRank: ordinal(item.rank)};
}
