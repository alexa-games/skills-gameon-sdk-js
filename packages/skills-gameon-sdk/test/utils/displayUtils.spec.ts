/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

// tslint:disable: no-magic-numbers
import { expect } from 'chai';
import {
    AugmentedPlayer,
    CombinationLeaderboard,
    getPlayerProfile,
    getPlayerScore,
    PlayerProfileGeneratorBuilder,
    renderLeaderboard
} from '../../src';

describe('displayUtils', () => {
    let generator;
    beforeEach(() => {
        const config = {
            avatarBaseUrl: '/',
            numberOfUniqueAvatars: 50
        };

        generator = PlayerProfileGeneratorBuilder.getGenerator({
            ...config,
            locale: 'en-US'
        });
    });
    it('Gets a player profile', async () => {
        const item = {
            externalPlayerId: '123-abc'
        };

        // @ts-ignore
        const player = getPlayerProfile(item, generator);
        expect(player.name).to.eq('Energetically Fierce Crocodile');
        expect(player.avatar).to.eq('/38.png');
        expect(player.color).to.eq('3c42f0');
        delete item.externalPlayerId;
        // This should never happen, but the method does support it.
        // @ts-ignore
        const player2 = getPlayerProfile(item, generator);
        expect(player2.name.length).to.be.greaterThan(0);
        expect(player2.avatar.length).to.be.greaterThan(0);
        expect(player2.color.length).to.be.greaterThan(0);
    });

    it('Gets a player score', async () => {
        const item = {
            score: 5,
            rank: 2
        };
        const score = getPlayerScore(item);
        expect(score.score).to.eq(5);
        expect(score.rank).to.eq(2);
        expect(score.ordinalRank).to.eq('2nd');
    });

    describe('Generates APL directives', () => {
        const renderOptions = {
            backgroundImageUrl: '/background.png',
            trophyUrl: '/trophy.png',
            logoImageUrl: '/logo.png',
            primaryColor: '#abc123',
            secondaryColor: '#123abc'
        };
        it('Single player leaderboard', async () => {
            const player = {
                score: {
                    rank: 1,
                    score: 22,
                    ordinalRank: '1st'
                },
                profile: {
                    name: 'Patiently Plain Lynx',
                    avatar: '/37.png',
                    color: 'cef2a0'
                },
                sessionApiKey: '5155ce02-1111-1111-2222-71882d1a52ad',
                sessionId: '553c5f49-1111-1111-2222-fb2e5d43c0b5',
                sessionExpirationDate: 0,
                externalPlayerId: 'a99c89bd-1111-1111-2222-671b012cd1c4',
                playerToken: '0774aba7-1111-1111-2222-c2355aebf8c8'
            } as AugmentedPlayer;

            const combinationLeaderboard = {
                topNLeaderboard: [
                    {
                        externalPlayerId: player.externalPlayerId,
                        score: player.score.score,
                        rank: player.score.rank
                    }
                ],
                neighborLeaderboard: []
            } as CombinationLeaderboard;

            const expectedLeaderboard = [{
                isCurrentPlayer: false,
                profile:
                    {
                        name: 'Patiently Plain Lynx',
                        avatar: '/37.png',
                        color: 'cef2a0'
                    },
                score: {rank: 1, score: 22, ordinalRank: '1st'}
            }];
            const leaderboardApl = renderLeaderboard(player, combinationLeaderboard, renderOptions, generator);
            expect(leaderboardApl.datasources.data.player).to.eq(player);
            expect(leaderboardApl.datasources.data.renderOptions).to.eq(renderOptions);
            expect(leaderboardApl.datasources.data.renderOptions.scorePrimaryText).to.eq(`You placed ${player.score.ordinalRank}!`);
            expect(leaderboardApl.datasources.data.renderOptions.scoreSecondaryText).to.eq(`${player.score.score} points`);
            expect(leaderboardApl.datasources.data.leaderboard).to.deep.eq(expectedLeaderboard);
        });

        it('Single player leaderboard with no render options', async () => {
            const player = {
                score: {
                    rank: 1,
                    score: 22,
                    ordinalRank: '1st'
                },
                profile: {
                    name: 'Patiently Plain Lynx',
                    avatar: '/37.png',
                    color: 'cef2a0'
                },
                sessionApiKey: '5155ce02-1111-1111-2222-71882d1a52ad',
                sessionId: '553c5f49-1111-1111-2222-fb2e5d43c0b5',
                sessionExpirationDate: 0,
                externalPlayerId: 'a99c89bd-1111-1111-2222-671b012cd1c4',
                playerToken: '0774aba7-1111-1111-2222-c2355aebf8c8'
            } as AugmentedPlayer;

            const combinationLeaderboard = {
                topNLeaderboard: [
                    {
                        externalPlayerId: player.externalPlayerId,
                        score: player.score.score,
                        rank: player.score.rank
                    }
                ],
                neighborLeaderboard: []
            } as CombinationLeaderboard;

            const expectedLeaderboard = [{
                isCurrentPlayer: false,
                profile:
                    {
                        name: 'Patiently Plain Lynx',
                        avatar: '/37.png',
                        color: 'cef2a0'
                    },
                score: {rank: 1, score: 22, ordinalRank: '1st'}
            }];
            const leaderboardApl = renderLeaderboard(player, combinationLeaderboard, {}, generator);
            expect(leaderboardApl.datasources.data.player).to.eq(player);
            expect(leaderboardApl.datasources.data.renderOptions.primaryColor).to.eq('#1da1a3');
            expect(leaderboardApl.datasources.data.renderOptions.secondaryColor).to.eq('#66298f');
            expect(leaderboardApl.datasources.data.leaderboard).to.deep.eq(expectedLeaderboard);
        });

        it('Top 3 player leaderboard', async () => {
            const player = {
                score: {
                    rank: 2,
                    score: 22,
                    ordinalRank: '2nd'
                },
                profile: {
                    name: 'Patiently Plain Lynx',
                    avatar: '/37.png',
                    color: 'cef2a0'
                },
                sessionApiKey: '5155ce02-1111-1111-2222-71882d1a52ad',
                sessionId: '553c5f49-1111-1111-2222-fb2e5d43c0b5',
                sessionExpirationDate: 0,
                externalPlayerId: 'a99c89bd-1111-1111-2222-671b012cd1c4',
                playerToken: '0774aba7-1111-1111-2222-c2355aebf8c8'
            } as AugmentedPlayer;

            const combinationLeaderboard = {
                topNLeaderboard: [
                    {
                        externalPlayerId: 'a6dd07a6-1111-1111-1111-af399d5cee4b',
                        rank: 1,
                        playerName: 'Loyally Super Squid',
                        score: 25
                    },
                    {
                        externalPlayerId: 'a99c89bd-1111-1111-2222-671b012cd1c4',
                        rank: 2,
                        playerName: 'Patiently Plain Lynx',
                        score: 22,
                        isCurrentPlayer: true
                    },
                    {
                        externalPlayerId: 'f6460ffc-1111-1111-1111-51a1032af15b',
                        rank: 3,
                        playerName: 'Woefully Plain Salamander',
                        score: 20
                    }
                ],
                neighborLeaderboard: []
            } as CombinationLeaderboard;

            const expectedLeaderboard = [{
                isCurrentPlayer: false,
                profile:
                    {
                        name: 'Loyally Super Squid',
                        avatar: '/20.png',
                        color: '386317'
                    },
                score: {rank: 1, score: 25, ordinalRank: '1st'}
            },
                {
                    isCurrentPlayer: true,
                    profile:
                        {
                            name: 'Patiently Plain Lynx',
                            avatar: '/37.png',
                            color: 'cef2a0'
                        },
                    score: {rank: 2, score: 22, ordinalRank: '2nd'}
                },
                {
                    isCurrentPlayer: false,
                    profile:
                        {
                            name: 'Woefully Plain Salamander',
                            avatar: '/21.png',
                            color: 'fe8a43'
                        },
                    score: {rank: 3, score: 20, ordinalRank: '3rd'}
                }];

            const leaderboardApl = renderLeaderboard(player, combinationLeaderboard, renderOptions, generator);
            expect(leaderboardApl.datasources.data.player).to.eq(player);
            expect(leaderboardApl.datasources.data.renderOptions).to.eq(renderOptions);
            expect(leaderboardApl.datasources.data.leaderboard).to.deep.eq(expectedLeaderboard);
        });

        it('Combined leaderboard', async () => {
            const player = {
                score: {
                    rank: 9,
                    score: 13,
                    ordinalRank: '9th'
                },
                profile: {
                    name: 'Patiently Plain Lynx',
                    avatar: '/37.png',
                    color: 'cef2a0'
                },
                sessionApiKey: '5155ce02-1111-1111-2222-71882d1a52ad',
                sessionId: '553c5f49-1111-1111-2222-fb2e5d43c0b5',
                sessionExpirationDate: 0,
                externalPlayerId: 'a99c89bd-1111-1111-2222-671b012cd1c4',
                playerToken: '0774aba7-1111-1111-2222-c2355aebf8c8'
            } as AugmentedPlayer;

            const combinationLeaderboard = {
                topNLeaderboard: [
                    {
                        externalPlayerId: 'a6dd07a6-1111-1111-1111-af399d5cee4b',
                        rank: 1,
                        playerName: 'Loyally Super Squid',
                        score: 25
                    },
                    {
                        externalPlayerId: '7c2e321e-1111-1111-1111-b163e6422230',
                        rank: 2,
                        playerName: 'Supposedly Aggressive Dingo',
                        score: 22
                    },
                    {
                        externalPlayerId: 'f6460ffc-1111-1111-1111-51a1032af15b',
                        rank: 3,
                        playerName: 'Woefully Plain Salamander',
                        score: 20
                    }
                ],
                neighborLeaderboard: [
                    {
                        externalPlayerId: 'adb667b0-1111-1111-1111-93123589c9fe',
                        rank: 8,
                        playerName: 'Loosely Creepy Wallaby',
                        score: 15
                    },
                    {
                        externalPlayerId: 'a99c89bd-1111-1111-2222-671b012cd1c4',
                        rank: 9,
                        playerName: 'Patiently Plain Lynx',
                        score: 13,
                        isCurrentPlayer: true
                    },
                    {
                        externalPlayerId: '275592bd-1111-1111-1111-19963815cd4e',
                        rank: 10,
                        playerName: 'Crossly Difficult Starfish',
                        score: 10
                    }
                ]
            } as CombinationLeaderboard;

            const expectedLeaderboard = [{
                isCurrentPlayer: false,
                profile:
                    {
                        name: 'Loyally Super Squid',
                        avatar: '/20.png',
                        color: '386317'
                    },
                score: {rank: 1, score: 25, ordinalRank: '1st'}
            },
                {
                    isCurrentPlayer: false,
                    profile:
                        {
                            name: 'Limply Angry Baboon',
                            avatar: '/35.png',
                            color: 'fdbd65'
                        },
                    score: {rank: 2, score: 22, ordinalRank: '2nd'}
                },
                {
                    isCurrentPlayer: false,
                    profile:
                        {
                            name: 'Woefully Plain Salamander',
                            avatar: '/21.png',
                            color: 'fe8a43'
                        },
                    score: {rank: 3, score: 20, ordinalRank: '3rd'}
                },
                {
                    isCurrentPlayer: false,
                    profile:
                        {
                            name: 'Joyously Fair Sheepdog',
                            avatar: '/14.png',
                            color: '5acc04'
                        },
                    score: {rank: 8, score: 15, ordinalRank: '8th'}
                },
                {
                    isCurrentPlayer: true,
                    profile:
                        {
                            name: 'Patiently Plain Lynx',
                            avatar: '/37.png',
                            color: 'cef2a0'
                        },
                    score: {rank: 9, score: 13, ordinalRank: '9th'}
                },
                {
                    isCurrentPlayer: false,
                    profile:
                        {
                            name: 'Vastly Jittery Bullfrog',
                            avatar: '/11.png',
                            color: '103e97'
                        },
                    score: {rank: 10, score: 10, ordinalRank: '10th'}
                }];

            const leaderboardApl = renderLeaderboard(player, combinationLeaderboard, renderOptions, generator);
            expect(leaderboardApl.datasources.data.player).to.eq(player);
            expect(leaderboardApl.datasources.data.renderOptions).to.eq(renderOptions);
            expect(leaderboardApl.datasources.data.leaderboard).to.deep.eq(expectedLeaderboard);
        });

        it('Single player leaderboard with custom Leaderbaord text', async () => {
            const scorePrimaryText = 'You are on top 1%';
            const scoreSecondaryText = '8 stars';

            const updatedTextRenderOption = {
                ...renderOptions,
                scorePrimaryText,
                scoreSecondaryText
            };

            const player = {
                score: {
                    rank: 1,
                    score: 22,
                    ordinalRank: '1st'
                },
                profile: {
                    name: 'Patiently Plain Lynx',
                    avatar: '/37.png',
                    color: 'cef2a0'
                },
                sessionApiKey: '5155ce02-1111-1111-2222-71882d1a52ad',
                sessionId: '553c5f49-1111-1111-2222-fb2e5d43c0b5',
                sessionExpirationDate: 0,
                externalPlayerId: 'a99c89bd-1111-1111-2222-671b012cd1c4',
                playerToken: '0774aba7-1111-1111-2222-c2355aebf8c8'
            } as AugmentedPlayer;

            const combinationLeaderboard = {
                topNLeaderboard: [
                    {
                        externalPlayerId: player.externalPlayerId,
                        score: player.score.score,
                        rank: player.score.rank
                    }
                ],
                neighborLeaderboard: []
            } as CombinationLeaderboard;

            const leaderboardApl = renderLeaderboard(player, combinationLeaderboard, updatedTextRenderOption, generator);
            expect(leaderboardApl.datasources.data.renderOptions.scorePrimaryText).to.eq(scorePrimaryText);
            expect(leaderboardApl.datasources.data.renderOptions.scoreSecondaryText).to.eq(scoreSecondaryText);
        });

    });

});
