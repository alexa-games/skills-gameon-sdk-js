/*
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
