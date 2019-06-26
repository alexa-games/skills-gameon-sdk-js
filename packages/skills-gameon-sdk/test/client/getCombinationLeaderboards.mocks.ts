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

// tslint:disable:no-unused-expression
// tslint:disable:no-magic-numbers

import { GetMatchLeaderboardResponseLeaderboardItem } from '@alexa-games/gameon-sdk';
import { GetLeaderboardParams } from '../../src/client/skillsGameOnApiClient';

export const topScorersLeaderboardResult = {
    leaderboard: [
        {
            externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b',
            rank: 1,
            playerName: 'Bob',
            score: 60
        },
        {
            externalPlayerId: '58f2b0ec-7b89-462d-aee0-82daa115db6b',
            rank: 2,
            playerName: 'Upright Angry Ferret',
            score: 55
        }, {
            externalPlayerId: 'f6460ffc-d52d-44cc-8d6f-51a1032af15b',
            rank: 3,
            playerName: 'Knavishly Stormy Macaw',
            score: 55
        }, {
            externalPlayerId: '610dd01c-e408-47a7-9142-20e0d00b7f36',
            rank: 4,
            playerName: 'Frightfully Jittery Bison',
            score: 52
        }, {
            externalPlayerId: 'a70c7b90-72ee-471d-b0d0-f7e6edb3b6f6',
            rank: 5,
            playerName: 'closely beautiful Panther',
            score: 51
        }, {
            externalPlayerId: 'f9938294-20ff-476e-ae05-4f6d6e0ba4d1',
            rank: 6,
            playerName: 'Positively Weary Rhinoceros',
            score: 51
        }, {
            externalPlayerId: '69db99e0-3b42-4ef5-aeb9-ba563b7a6d8a',
            rank: 7,
            playerName: 'Supposedly Better Horse',
            score: 51
        }, {
            externalPlayerId: '7c2e321e-8cf3-42c7-a1cb-b163e6422230',
            rank: 8,
            playerName: 'Supposedly Aggressive Dingo',
            score: 50
        }, {
            externalPlayerId: 'adb667b0-ae02-4920-b61c-93123589c9fe',
            rank: 9,
            playerName: 'Loosely Creepy Wallaby',
            score: 45
        }, {
            externalPlayerId: '275592bd-07b4-4f8f-8450-19963815cd4e',
            rank: 10,
            playerName: 'Crossly Difficult Starfish',
            score: 41
        }, {
            externalPlayerId: '74a66c29-8ffc-4070-a13f-522cb4af6a51',
            rank: 11,
            playerName: 'hourly dangerous Alligator',
            score: 36
        }, {
            externalPlayerId: '0edb0e69-9aa6-452b-acb2-59831f4ac418',
            rank: 12,
            playerName: 'tremendously good Sea Slug',
            score: 32
        }, {
            externalPlayerId: '0af83141-e016-4d02-b083-6a408ef49cad',
            rank: 13,
            playerName: 'overconfidently cute Stingray',
            score: 30
        }, {
            externalPlayerId: '8b31dba1-aa0a-4b47-9139-cb8a981afa61',
            rank: 14,
            playerName: 'Painfully Bloody Starfish',
            score: 29
        }, {
            externalPlayerId: 'd228c038-977d-4845-8645-b4217b133985',
            rank: 15,
            playerName: 'lively tense Bullfrog',
            score: 22
        }, {
            externalPlayerId: '6995ea46-ef04-48d8-9d4f-3a095cb35855',
            rank: 16,
            playerName: 'Speedily Nice Chihuahua',
            score: 22
        }, {
            externalPlayerId: '2d70edd3-0b4f-4360-b87b-38a4aff72400',
            rank: 17,
            playerName: 'Longingly Anxious Koala',
            score: 19
        }, {
            externalPlayerId: '5c9f3056-b458-46c7-bde5-ccbb526e4e70',
            rank: 18,
            playerName: 'Bleakly Bright Goose',
            score: 11
        }, {
            externalPlayerId: '706d2de2-f518-423a-9f75-d386bc04e194',
            rank: 19,
            playerName: 'player_706d2d',
            score: 10
        }, {
            externalPlayerId: 'f283268b-e014-4d82-973e-0af5f73a467b',
            rank: 20,
            playerName: 'player_f28326',
            score: 10
        }, {
            externalPlayerId: 'f1d3cbdc-fcf0-4e40-9c7f-ecb9f4ab1256',
            rank: 21,
            playerName: 'a1f214eb-7427-49fc-b156-ba79e8673d71',
            score: 10
        }, {
            externalPlayerId: '9ddefdb6-0aaf-4a39-beda-6c3bc7829c85',
            rank: 22,
            playerName: '3d65ca98-21d8-48cc-8f7d-5d89f038e44c',
            score: 10
        }, {
            externalPlayerId: '8155a74a-3e2a-45a8-93f0-f9a06a07ac37',
            rank: 23,
            playerName: '64bbb2f9-9c69-44da-90a1-25e8df1f4697',
            score: 10
        }, {
            externalPlayerId: '9db33502-8e7b-42e4-ae91-f6b3711ca332',
            rank: 24,
            playerName: 'd543d566-f05c-41e4-a264-3e151670f6e0',
            score: 10
        }, {
            externalPlayerId: '05b62aab-c691-443e-b124-40cb81d68649',
            rank: 25,
            playerName: '64bcae62-c3e2-470e-aa56-d39f4f02852b',
            score: 10
        }],
    next: '/matches/someKey'
};

export const neighborBoardResponse = {
    currentPlayer: {
        externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b',
        rank: 1,
        playerName: 'Position 1',
        score: 60
    },
    neighbors: [{
        externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b',
        isCurrentPlayer: true,
        rank: 1,
        playerName: 'Position 1',
        score: 60
    }, {
        externalPlayerId: '58f2b0ec-7b89-462d-aee0-82daa115db6b',
        rank: 2,
        playerName: 'Position 2',
        score: 55
    },
    {
        externalPlayerId: 'f6460ffc-d52d-44cc-8d6f-51a1032af15b',
        rank: 3,
        playerName: 'Position 3',
        score: 55
    }]
};

export const neighborBoardNotIncludedResponse = {
    currentPlayer: {
        externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b1',
        rank: 26,
        playerName: 'Position 1',
        score: 60
    },
    neighbors: [{
        externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b1',
        isCurrentPlayer: true,
        rank: 27,
        playerName: 'Position 1',
        score: 60
    }, {
        externalPlayerId: '58f2b0ec-7b89-462d-aee0-82daa115db6b2',
        rank: 28,
        playerName: 'Position 2',
        score: 55
    },
    {
        externalPlayerId: 'f6460ffc-d52d-44cc-8d6f-51a1032af15b3',
        rank: 29,
        playerName: 'Position 3',
        score: 55
    }]
};

const getLeaderboardStub = async (params: GetLeaderboardParams) => {
    return new Promise((resolve) => {
        if (params.currentPlayerNeighbors) {
            return resolve({
                currentPlayer: {
                    externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b',
                    rank: 1,
                    playerName: 'Position 1',
                    score: 60
                },
                neighbors: [{
                    externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b',
                    isCurrentPlayer: true,
                    rank: 1,
                    playerName: 'Position 1',
                    score: 60
                }, {
                    externalPlayerId: '58f2b0ec-7b89-462d-aee0-82daa115db6b',
                    rank: 2,
                    playerName: 'Position 2',
                    score: 55
                },
                {
                    externalPlayerId: 'f6460ffc-d52d-44cc-8d6f-51a1032af15b',
                    rank: 3,
                    playerName: 'Position 3',
                    score: 55
                }]
            });
        }
        return resolve({
            leaderboard: topScorersLeaderboardResult.leaderboard
                .filter((item: GetMatchLeaderboardResponseLeaderboardItem) => {
                    // @ts-ignore
                    return item.rank <= 10;
                })
        });
    });
};
