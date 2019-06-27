/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

// tslint:disable:no-unused-expression
// tslint:disable:no-magic-numbers

import { GetMatchListResponse, GetMatchListResponseMatch, GetMatchListResponsePlayerGeneratedMatch } from '@alexa-games/gameon-sdk';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { SinonFakeTimers } from 'sinon';
import {
    AugmentedPlayer,
    GetCombinationLeaderboardsParams,
    InitializeNewAugmentedPlayerParams,
    InitializeNewPlayerParams,
    Player,
    PlayerScore,
    RefreshSessionParams,
    SkillsGameOnApiClient,
    TournamentType
} from '../../src/client/skillsGameOnApiClient';
import { PlayerProfileGeneratorBuilder } from '../../src/player/playerProfileGeneratorBuilder';
import { neighborBoardNotIncludedResponse, neighborBoardResponse, topScorersLeaderboardResult } from './getCombinationLeaderboards.mocks';

describe('skillsGameOnApiClient', () => {
    let skillsGameOnApiClient: SkillsGameOnApiClient;
    let player: Player;
    beforeEach(() => {
        skillsGameOnApiClient = new SkillsGameOnApiClient();
        player = { sessionId: 'test-session-id', sessionApiKey: 'test-api-key' } as Player;
    });

    describe('getMatchListForPlayer', () => {
        const tournamentId = 'test-id';
        const originalMatchListResponse = {
            matches: [{ tournamentId } as GetMatchListResponseMatch],
            playerMatches: [{ tournamentId } as GetMatchListResponsePlayerGeneratedMatch]
        };
        let matchListResponse: GetMatchListResponse;

        beforeEach(() => {
            matchListResponse = {
                matches: [{ tournamentId } as GetMatchListResponseMatch],
                playerMatches: [{ tournamentId } as GetMatchListResponsePlayerGeneratedMatch]
            };
        });
        afterEach(() => {
            sinon.restore();
        });

        it('Returns original response if tournamentId is not speciifed', async () => {
            sinon.replace(skillsGameOnApiClient, 'getMatchList', sinon.fake.returns(matchListResponse));
            const matchResponsePlayer = await skillsGameOnApiClient.getMatchListForPlayer({ player: {} as Player });
            expect(matchResponsePlayer).to.be.deep.equal(originalMatchListResponse);
        });

        it('Returns no matches if tournamentId does not match', async () => {
            sinon.replace(skillsGameOnApiClient, 'getMatchList', sinon.fake.returns(matchListResponse));
            const matchResponsePlayer = await skillsGameOnApiClient.getMatchListForPlayer({
                player: {} as Player,
                tournamentId: 'not-a-match'
            });
            expect(matchResponsePlayer.matches).to.be.empty;
            expect(matchResponsePlayer.playerMatches).to.be.empty;
        });

        it('Returns matches with matching tournamentId', async () => {
            sinon.replace(skillsGameOnApiClient, 'getMatchList', sinon.fake.returns(matchListResponse));
            const matchResponsePlayer = await skillsGameOnApiClient.getMatchListForPlayer({
                player: {} as Player,
                tournamentId
            });
            expect(matchResponsePlayer).to.be.deep.equal(originalMatchListResponse);
        });

        it('Returns filtered matches without matching tournamentId', async () => {
            const matchListResponseFilter: GetMatchListResponse = {
                matches: [{ tournamentId } as GetMatchListResponseMatch,
                { tournamentId: 'not-matching' } as GetMatchListResponseMatch],
                playerMatches: [{ tournamentId } as GetMatchListResponsePlayerGeneratedMatch,
                { tournamentId: 'not-matching' } as GetMatchListResponsePlayerGeneratedMatch]
            };
            sinon.replace(skillsGameOnApiClient, 'getMatchList', sinon.fake.returns(matchListResponseFilter));
            const matchResponsePlayer = await skillsGameOnApiClient.getMatchListForPlayer({
                player: {} as Player,
                tournamentId
            });
            expect(matchResponsePlayer).to.be.deep.equal(originalMatchListResponse);
        });

    });

    describe('getTournamentsByTitle', () => {
        let tournamentsResponse;

        afterEach(() => {
            sinon.restore();
        });

        it('Returns empty when tournaments list is empty', async () => {
            tournamentsResponse = { tournaments: [] };
            sinon.replace(skillsGameOnApiClient, 'getTournamentListForPlayer', sinon.fake.returns(tournamentsResponse));
            const tournaments = await skillsGameOnApiClient.getTournamentsByTitle('1', player);
            expect(tournaments).to.be.empty;

        });

        it('Returns empty when tournaments list is undefined', async () => {
            tournamentsResponse = {};
            sinon.replace(skillsGameOnApiClient, 'getTournamentListForPlayer', sinon.fake.returns(tournamentsResponse));
            const tournaments = await skillsGameOnApiClient.getTournamentsByTitle('1', player);
            expect(tournaments).to.be.empty;
        });

        it('Returns empty list when title is not found', async () => {
            tournamentsResponse = { tournaments: [{ title: 'test-1' }] };
            sinon.replace(skillsGameOnApiClient, 'getTournamentListForPlayer', sinon.fake.returns(tournamentsResponse));
            const tournaments = await skillsGameOnApiClient.getTournamentsByTitle('1', player);
            expect(tournaments).to.be.empty;
        });

        it('Returns correct tournament when title matches', async () => {
            const mockTournamentList = [{ title: 'test-2' }];
            tournamentsResponse = { tournaments: mockTournamentList };
            sinon.replace(skillsGameOnApiClient, 'getTournamentListForPlayer', sinon.fake.returns(tournamentsResponse));
            const tournaments = await skillsGameOnApiClient.getTournamentsByTitle('test-2', player);
            expect(tournaments).to.deep.equal(mockTournamentList);
        });

    });

    describe('getTournamentListForPlayer', () => {
        let tournamentsResponse;

        afterEach(() => {
            sinon.restore();
        });

        it('Passes player attributes correctly', async () => {
            tournamentsResponse = { tournaments: [{ title: 'test-3' }] };
            const testLimit = 0;
            const fakeGetTournamentList = sinon.fake.returns(tournamentsResponse);
            sinon.replace(skillsGameOnApiClient, 'getTournamentList', fakeGetTournamentList);
            const tournaments = await skillsGameOnApiClient.getTournamentListForPlayer({ player, limit: testLimit });
            expect(tournaments.tournaments).to.deep.equal(tournamentsResponse.tournaments);
            expect(fakeGetTournamentList.calledOnce).to.be.true;
            expect(fakeGetTournamentList.args[0][0]).to.be.equal(player.sessionApiKey);
            expect(fakeGetTournamentList.args[0][1]).to.be.equal(player.sessionId);
            expect(fakeGetTournamentList.args[0][2]).to.be.equal(testLimit.toString(10));
        });

    });

    describe('getTournamentDetailsForPlayer', () => {
        let tournamentsResponse;

        afterEach(() => {
            sinon.restore();
        });

        it('Passes params correctly', async () => {
            tournamentsResponse = { canEnter: true, test: 'object' };
            const tournamentId = 'test-id1';
            const testAttributes = '{"test": "attr"}';
            const testLimit = 7;
            const getTournamentListFake = sinon.fake.returns(tournamentsResponse);
            sinon.replace(skillsGameOnApiClient, 'getTournamentDetails', getTournamentListFake);
            const getTournDetailsResp = await skillsGameOnApiClient.getTournamentDetailsForPlayer({
                player, playerAttributes: testAttributes, tournamentId
            });
            expect(getTournDetailsResp).to.deep.equal(tournamentsResponse);
            expect(getTournamentListFake.calledOnce).to.be.true;
            expect(getTournamentListFake.args[0][0]).to.be.equal(player.sessionId);
            expect(getTournamentListFake.args[0][1]).to.be.equal(tournamentId);
            expect(getTournamentListFake.args[0][2]).to.be.equal(player.sessionApiKey);
            expect(getTournamentListFake.args[0][3]).to.be.equal(testAttributes);
        });

    });

    describe('getMatchDetailsForPlayer', () => {
        let response;

        afterEach(() => {
            sinon.restore();
        });

        it('Passes params correctly', async () => {
            response = { mock: 'response' };
            const matchId = 'test-id1';
            const testAttributes = '{"test": "attr"}';
            const getMatchDetailsFake = sinon.fake.returns(response);
            sinon.replace(skillsGameOnApiClient, 'getMatchDetails', getMatchDetailsFake);
            const getMatchDetailsResp = await skillsGameOnApiClient.getMatchDetailsForPlayer({
                matchId,
                player,
                playerAttributes: testAttributes
            });
            expect(getMatchDetailsResp).to.deep.equal(response);
            expect(getMatchDetailsFake.calledOnce).to.be.true;
            expect(getMatchDetailsFake.args[0][0]).to.be.equal(matchId);
            expect(getMatchDetailsFake.args[0][1]).to.be.equal(player.sessionId);
            expect(getMatchDetailsFake.args[0][2]).to.be.equal(player.sessionApiKey);
            expect(getMatchDetailsFake.args[0][3]).to.be.equal(testAttributes);
        });

    });

    describe('enterMatchForPlayer', () => {
        let response;

        afterEach(() => {
            sinon.restore();
        });

        it('Passes params correctly', async () => {
            response = { mock: 'response' };
            const matchId = 'test-id1';
            const enterMatchRequest = {};
            const enterMatchFake = sinon.fake.returns(response);
            sinon.replace(skillsGameOnApiClient, 'enterMatch', enterMatchFake);
            const enterTournResp = await skillsGameOnApiClient.enterMatchForPlayer({
                enterMatchRequest,
                matchId,
                player
            });
            expect(enterTournResp).to.deep.equal(response);
            expect(enterMatchFake.calledOnce).to.be.true;
            expect(enterMatchFake.args[0][0]).to.be.equal(matchId);
            expect(enterMatchFake.args[0][1]).to.be.equal(player.sessionId);
            expect(enterMatchFake.args[0][2]).to.be.equal(player.sessionApiKey);
            expect(enterMatchFake.args[0][3]).to.be.equal(enterMatchRequest);
        });

    });

    describe('submitScoreForPlayer', () => {
        const matchId = 'test-id';
        const submitScoreRequest = {};
        let enterMatchForPlayerFake: sinon.SinonSpy;
        let submitScoreFake: sinon.SinonSpy;

        afterEach(() => {
            sinon.restore();
        });

        beforeEach(() => {
            enterMatchForPlayerFake = sinon.fake.returns({});
            submitScoreFake = sinon.fake.returns({});
            sinon.replace(skillsGameOnApiClient, 'enterMatchForPlayer', enterMatchForPlayerFake);
            sinon.replace(skillsGameOnApiClient, 'submitScore', submitScoreFake);
        });

        it('Checks if match can be entered and enters', async () => {
            const getMatchDetailsForPlayerFake = sinon.fake.returns({ canEnter: true });
            sinon.replace(skillsGameOnApiClient, 'getMatchDetailsForPlayer', getMatchDetailsForPlayerFake);
            const submitScoreResponse = await skillsGameOnApiClient.submitScoreForPlayer({
                ensureMatchEntered: true,
                matchId,
                player,
                submitScoreRequest
            });
            expect(getMatchDetailsForPlayerFake.calledOnce).to.be.true;
            expect(enterMatchForPlayerFake.calledOnce).to.be.true;
            expect(submitScoreFake.calledOnce).to.be.true;
            expect(getMatchDetailsForPlayerFake.args[0]).to.deep.equal([{ matchId, playerAttributes: undefined, player }]);
            expect(enterMatchForPlayerFake.args[0]).to.deep.equal([
                { matchId, enterMatchRequest: { playerAttributes: { isActive: 'true' } }, player }]);
            expect(submitScoreFake.args[0]).to.deep.equal([matchId, player.sessionId, player.sessionApiKey, submitScoreRequest]);
        });

        it('Checks if match can be entered and does not enter', async () => {
            const getMatchDetailsForPlayerFake = sinon.fake.returns({ canEnter: false });
            sinon.replace(skillsGameOnApiClient, 'getMatchDetailsForPlayer', getMatchDetailsForPlayerFake);
            const submitScoreResponse = await skillsGameOnApiClient.submitScoreForPlayer({
                ensureMatchEntered: true,
                matchId,
                player,
                submitScoreRequest
            });
            expect(getMatchDetailsForPlayerFake.calledOnce).to.be.true;
            expect(enterMatchForPlayerFake.notCalled).to.be.true;
            expect(submitScoreFake.calledOnce).to.be.true;
            expect(getMatchDetailsForPlayerFake.args[0]).to.deep.equal([{ matchId, playerAttributes: undefined, player }]);
            expect(submitScoreFake.args[0]).to.deep.equal([matchId, player.sessionId, player.sessionApiKey, submitScoreRequest]);
        });

        it('Does not check if match can be entered by default', async () => {
            const getMatchDetailsForPlayerFake = sinon.fake.returns({ canEnter: true });
            sinon.replace(skillsGameOnApiClient, 'getMatchDetailsForPlayer', getMatchDetailsForPlayerFake);
            const submitScoreResponse = await skillsGameOnApiClient.submitScoreForPlayer({
                matchId,
                player,
                submitScoreRequest
            });
            expect(getMatchDetailsForPlayerFake.notCalled).to.be.true;
            expect(enterMatchForPlayerFake.notCalled).to.be.true;
            expect(submitScoreFake.calledOnce).to.be.true;
            expect(submitScoreFake.args[0]).to.deep.equal([matchId, player.sessionId, player.sessionApiKey, submitScoreRequest]);
        });

        it('Does not check if match can be entered when specified', async () => {
            const getMatchDetailsForPlayerFake = sinon.fake.returns({ canEnter: true });
            sinon.replace(skillsGameOnApiClient, 'getMatchDetailsForPlayer', getMatchDetailsForPlayerFake);
            const submitScoreResponse = await skillsGameOnApiClient.submitScoreForPlayer({
                ensureMatchEntered: false,
                matchId,
                player,
                submitScoreRequest
            });
            expect(getMatchDetailsForPlayerFake.notCalled).to.be.true;
            expect(enterMatchForPlayerFake.notCalled).to.be.true;
            expect(submitScoreFake.calledOnce).to.be.true;
            expect(submitScoreFake.args[0]).to.deep.equal([matchId, player.sessionId, player.sessionApiKey, submitScoreRequest]);
        });

    });

    describe('getMatchLeaderboardForPlayer', () => {
        let response;

        afterEach(() => {
            sinon.restore();
        });

        it('Passes params correctly', async () => {
            response = { mock: 'response' };
            const matchId = 'test-id1';
            const enterMatchRequest = {};
            const getMatchLeaderboardFake = sinon.fake.returns(response);
            sinon.replace(skillsGameOnApiClient, 'getMatchLeaderboard', getMatchLeaderboardFake);
            const enterTournResp = await skillsGameOnApiClient.getMatchLeaderboardForPlayer({
                player,
                matchId,
                limit: 0,
                currentPlayerNeighbors: 3
            });
            expect(enterTournResp).to.deep.equal(response);
            expect(getMatchLeaderboardFake.calledOnce).to.be.true;
            expect(getMatchLeaderboardFake.args[0]).to.deep.equal([
                matchId,
                player.sessionApiKey,
                player.sessionId,
                '0',
                '3',
                undefined
            ]);
        });

        it('Passes unspecified limits correctly', async () => {
            response = { mock: 'response' };
            const matchId = 'test-id1';
            const enterMatchRequest = {};
            const getMatchLeaderboardFake = sinon.fake.returns(response);
            sinon.replace(skillsGameOnApiClient, 'getMatchLeaderboard', getMatchLeaderboardFake);
            const enterTournResp = await skillsGameOnApiClient.getMatchLeaderboardForPlayer({
                player,
                matchId
            });
            expect(enterTournResp).to.deep.equal(response);
            expect(getMatchLeaderboardFake.calledOnce).to.be.true;
            expect(getMatchLeaderboardFake.args[0]).to.deep.equal([
                matchId,
                player.sessionApiKey,
                player.sessionId,
                undefined,
                undefined,
                undefined
            ]);
        });

    });

    describe('enterTournamentForPlayer', () => {
        const tournamentsResponse = { attemptsRemaining: 1, matchId: 'test-match-id', tournamentId: 'test-tourn-id' };
        const tournamentId = 'test-tourn-id';
        let fakeEnterTournament;

        beforeEach(() => {
            fakeEnterTournament = sinon.fake.returns(tournamentsResponse);
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Enter admin tournament when specifying admin', async () => {
            sinon.replace(skillsGameOnApiClient, 'enterTournament', fakeEnterTournament);
            const enterTournamentForPlayerResp = await skillsGameOnApiClient.enterTournamentForPlayer({
                player, tournamentId,
                enterTournamentRequest: { accessKey: 'test-key', playerAttributes: {}, teamId: 'team-id' },
                tournamentType: TournamentType.Admin
            });
            expect(fakeEnterTournament.calledOnce).to.be.true;
            expect(enterTournamentForPlayerResp).to.deep.equal(tournamentsResponse);
        });

        it('Enter admin tournament by default', async () => {
            sinon.replace(skillsGameOnApiClient, 'enterTournament', fakeEnterTournament);
            const enterTournamentForPlayerResp = await skillsGameOnApiClient.enterTournamentForPlayer({
                player, tournamentId,
                enterTournamentRequest: { accessKey: 'test-key', playerAttributes: {}, teamId: 'team-id' }
            });
            expect(fakeEnterTournament.calledOnce).to.be.true;
            expect(enterTournamentForPlayerResp).to.deep.equal(tournamentsResponse);
        });

        it('Enter player tournament when specified', async () => {
            sinon.replace(skillsGameOnApiClient, 'enterPlayerTournament', fakeEnterTournament);
            const enterTournamentForPlayerResp = await skillsGameOnApiClient.enterTournamentForPlayer({
                player, tournamentId,
                enterTournamentRequest: { accessKey: 'test-key', playerAttributes: {}, teamId: 'team-id' },
                tournamentType: TournamentType.Player
            });
            expect(fakeEnterTournament.calledOnce).to.be.true;
            expect(enterTournamentForPlayerResp).to.deep.equal(tournamentsResponse);
        });

    });

    describe('getCombinationLeaderboard', () => {
        let getLeaderboardResponse;
        const getCombinationLeaderboardsParams: GetCombinationLeaderboardsParams = {
            matchId: 'not-a-real-match-id',
            topScoresLimit: 25,
            playerNeighborsLimit: 1,
            player: {} as Player
        };
        afterEach(() => {
            sinon.restore();
        });

        it('Returns empty leaderboards when topScores and neighbor boards are empty', async () => {
            getLeaderboardResponse = { leaderboard: [] };
            sinon.replace(skillsGameOnApiClient, 'getMatchLeaderboardForPlayer', sinon.fake.returns(getLeaderboardResponse));
            const combinationLeaderboard = await skillsGameOnApiClient.getCombinationLeaderboards(getCombinationLeaderboardsParams);
            expect(combinationLeaderboard.neighborLeaderboard).to.be.empty;
            expect(combinationLeaderboard.topNLeaderboard).to.be.empty;
        });

        it('Returns only topScores if player is in top score leaderboard', async () => {
            getLeaderboardResponse = {
                leaderboard: [{
                    externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b',
                    rank: 1,
                    playerName: 'Bob',
                    score: 60
                }]
            };
            const getLeaderboardStub = sinon.stub();

            // stubbing neighborBoard
            getLeaderboardStub.withArgs(
                {
                    matchId: getCombinationLeaderboardsParams.matchId,
                    currentPlayerNeighbors: getCombinationLeaderboardsParams.playerNeighborsLimit,
                    player: {}
                }).returns(
                    neighborBoardResponse
                );

            // stubbing topNBoard
            getLeaderboardStub.withArgs({
                matchId: getCombinationLeaderboardsParams.matchId,
                limit: getCombinationLeaderboardsParams.topScoresLimit,
                player: {}
            }).returns(
                topScorersLeaderboardResult
            );

            sinon.replace(skillsGameOnApiClient, 'getMatchLeaderboardForPlayer', getLeaderboardStub);

            const combinationLeaderboard = await skillsGameOnApiClient.getCombinationLeaderboards(getCombinationLeaderboardsParams);
            expect(combinationLeaderboard.neighborLeaderboard).to.be.empty;
            expect(combinationLeaderboard.topNLeaderboard).to.deep.equal(topScorersLeaderboardResult.leaderboard);
        });

        it('Returns topScores and neighbord boards if player is not in top score leaderboard', async () => {
            getLeaderboardResponse = {
                leaderboard: [{
                    externalPlayerId: 'a6dd07a6-1367-4c3a-a950-af399d5cee4b',
                    rank: 1,
                    playerName: 'Bob',
                    score: 60
                }]
            };
            const getLeaderboardStub = sinon.stub();

            // stubbing neighborBoard
            getLeaderboardStub.withArgs(
                {
                    matchId: getCombinationLeaderboardsParams.matchId,
                    currentPlayerNeighbors: getCombinationLeaderboardsParams.playerNeighborsLimit,
                    player: {}
                }).returns(
                    neighborBoardNotIncludedResponse
                );

            // stubbing topNBoard
            getLeaderboardStub.withArgs({
                matchId: getCombinationLeaderboardsParams.matchId,
                limit: getCombinationLeaderboardsParams.topScoresLimit,
                player: {}
            }).returns(
                topScorersLeaderboardResult
            );

            sinon.replace(skillsGameOnApiClient, 'getMatchLeaderboardForPlayer', getLeaderboardStub);

            const combinationLeaderboard = await skillsGameOnApiClient.getCombinationLeaderboards(getCombinationLeaderboardsParams);
            expect(combinationLeaderboard.neighborLeaderboard).to.deep.equal(neighborBoardNotIncludedResponse.neighbors);
            expect(combinationLeaderboard.topNLeaderboard).to.deep.equal(topScorersLeaderboardResult.leaderboard);
        });
    });

    describe('initializeNewAugmentedPlayer', () => {
        const initializeNewAugmentedPlayerParams: InitializeNewAugmentedPlayerParams = {
            appBuildType: 'development',
            gameApiKey: 'test-key',
            playerProfileGenerator: PlayerProfileGeneratorBuilder.getGenerator({ avatarBaseUrl: 'test-url' })
        };

        afterEach(() => {
            sinon.restore();
        });

        it('Throws error when authPlayerResponse does not include sessionId', async () => {

            const authPlayerResponse = {};
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));
            sinon.replace(skillsGameOnApiClient, 'registerPlayer',
                sinon.fake.returns({ playerToken: 'not-a-valid-token', externalPlayerId: 'test-id' }));
            try {
                await skillsGameOnApiClient.initializeNewAugmentedPlayer(initializeNewAugmentedPlayerParams);
            } catch (e) {
                expect(e.message).equal('Response from authenticate player does not contain a session Id');
                return;
            }
            throw new Error('exception should have been thrown');
        });

        it('Returns a valid player', async () => {
            const authPlayerResponse = {
                sessionId: 'test-sessionId',
                sessionExpirationDate: 'test-date',
                sessionApiKey: 'test-key'
            };
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));
            sinon.replace(skillsGameOnApiClient, 'registerPlayer',
                sinon.fake.returns({
                    playerToken: 'test-token',
                    externalPlayerId: 'test-id'
                }));

            const newPlayer = await skillsGameOnApiClient.initializeNewAugmentedPlayer(initializeNewAugmentedPlayerParams);
            expect(newPlayer.profile).deep.equals({
                name: 'Absentmindedly Naughty Komodo Dragon',
                avatar: 'test-url/402.png',
                color: '9aa9fe'
            });
            expect(newPlayer.playerToken).equals('test-token');
            expect(newPlayer.externalPlayerId).equals('test-id');
            expect(newPlayer.sessionId).equals(authPlayerResponse.sessionId);
            expect(newPlayer.sessionExpirationDate).equals(authPlayerResponse.sessionExpirationDate);
            expect(newPlayer.score.rank).equals(0);
            expect(newPlayer.score.score).equals(0);
            expect(newPlayer.score.ordinalRank).equals('');
        });

    });

    describe('initializeNewPlayer', () => {
        const initializeNewPlayerParams: InitializeNewPlayerParams = {
            appBuildType: 'development',
            gameApiKey: 'test-key'
        };

        afterEach(() => {
            sinon.restore();
        });

        it('Throws error when authPlayerResponse does not include sessionId', async () => {
            const authPlayerResponse = {};
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));
            sinon.replace(skillsGameOnApiClient, 'registerPlayer',
                sinon.fake.returns({ playerToken: 'not-a-valid-token', externalPlayerId: 'test-id' }));
            try {
                await skillsGameOnApiClient.initializeNewPlayer(initializeNewPlayerParams);
            } catch (e) {
                expect(e.message).equal('Response from authenticate player does not contain a session Id');
                return;
            }
            throw new Error('exception should have been thrown');
        });

        it('Returns a valid player', async () => {
            const authPlayerResponse = {
                sessionId: 'test-sessionId',
                sessionExpirationDate: 'test-date',
                sessionApiKey: 'test-key'
            };
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));
            sinon.replace(skillsGameOnApiClient, 'registerPlayer',
                sinon.fake.returns({
                    playerToken: 'test-token',
                    externalPlayerId: 'test-id'
                }));

            const newPlayer = await skillsGameOnApiClient.initializeNewPlayer(initializeNewPlayerParams);
            expect(newPlayer.playerToken).equals('test-token');
            expect(newPlayer.externalPlayerId).equals('test-id');
            expect(newPlayer.sessionId).equals(authPlayerResponse.sessionId);
            expect(newPlayer.sessionExpirationDate).equals(authPlayerResponse.sessionExpirationDate);
        });

    });

    describe('refreshPlayerSessions', () => {
        let refreshSessionParams: RefreshSessionParams<Player>;
        let clock: SinonFakeTimers;
        const playerToken = 'test-token';
        const externalPlayerId = 'test-id';

        beforeEach(() => {
            clock = sinon.useFakeTimers(60 * 60 * 1000);
            refreshSessionParams = {
                appBuildType: 'development',
                gameApiKey: 'test-key',
                player: {
                    externalPlayerId,
                    playerToken,
                    sessionApiKey: 'test-api-key',
                    sessionExpirationDate: 61 * 60 * 1000,
                    sessionId: 'test-id'
                }
            };
        });

        afterEach(() => {
            clock.restore();
            sinon.restore();
        });

        it('Does not call auth player if session has not expired', async () => {
            const authPlayerResponse = {};
            const fakeAuth = sinon.fake.returns(authPlayerResponse);
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                fakeAuth);
            refreshSessionParams.refreshBufferInMinutes = 0;
            let newPlayer = await skillsGameOnApiClient.refreshPlayerSession(refreshSessionParams);
            expect(refreshSessionParams.player).to.deep.equal(newPlayer);
            expect(fakeAuth.notCalled).to.be.true;

            refreshSessionParams.refreshBufferInMinutes = 0.9;
            newPlayer = await skillsGameOnApiClient.refreshPlayerSession(refreshSessionParams);
            expect(refreshSessionParams.player).to.deep.equal(newPlayer);
            expect(fakeAuth.notCalled).to.be.true;

            refreshSessionParams.refreshBufferInMinutes = undefined; // use default buffer duration
            refreshSessionParams.player.sessionExpirationDate = 120.1 * 60 * 1000; // 60.1 minutes after current time
            newPlayer = await skillsGameOnApiClient.refreshPlayerSession(refreshSessionParams);
            expect(refreshSessionParams.player).to.deep.equal(newPlayer);
            expect(fakeAuth.notCalled).to.be.true;
        });

        it('Throws error when authPlayerResponse does not include sessionId', async () => {
            const authPlayerResponse = {};
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));
            try {
                await skillsGameOnApiClient.refreshPlayerSession(refreshSessionParams);
            } catch (e) {
                expect(e.message).equal('Response from authenticate player does not contain a session Id');
                return;
            }
            throw new Error('exception should have been thrown');
        });

        it('Returns a valid base player with new session attributes with less than default buffer time', async () => {
            const authPlayerResponse = {
                sessionId: 'test-sessionId-new',
                sessionExpirationDate: 'test-date-new',
                sessionApiKey: 'test-key-new'
            };
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));
            refreshSessionParams.refreshBufferInMinutes = undefined; // use default buffer duration
            const newPlayer = await skillsGameOnApiClient.refreshPlayerSession(refreshSessionParams);
            expect(newPlayer.playerToken).equals(playerToken);
            expect(newPlayer.externalPlayerId).equals(externalPlayerId);
            expect(newPlayer.sessionId).equals(authPlayerResponse.sessionId);
            expect(newPlayer.sessionExpirationDate).equals(authPlayerResponse.sessionExpirationDate);
        });

        it('Returns a valid base player with new session attributes with exactly default buffer time left', async () => {
            const authPlayerResponse = {
                sessionId: 'test-sessionId-new',
                sessionExpirationDate: 'test-date-new',
                sessionApiKey: 'test-key-new'
            };
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));

            refreshSessionParams.refreshBufferInMinutes = undefined; // use default buffer duration
            refreshSessionParams.player.sessionExpirationDate = 120 * 60 * 1000; // 60 minutes after
            const newPlayer = await skillsGameOnApiClient.refreshPlayerSession(refreshSessionParams);
            expect(newPlayer.playerToken).equals(playerToken);
            expect(newPlayer.externalPlayerId).equals(externalPlayerId);
            expect(newPlayer.sessionId).equals(authPlayerResponse.sessionId);
            expect(newPlayer.sessionExpirationDate).equals(authPlayerResponse.sessionExpirationDate);
        });

        it('Returns a valid base player with new session attributes with 1 minute less than default buffer time', async () => {
            const authPlayerResponse = {
                sessionId: 'test-sessionId-new',
                sessionExpirationDate: 'test-date-new',
                sessionApiKey: 'test-key-new'
            };
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));

            refreshSessionParams.refreshBufferInMinutes = undefined; // use default buffer duration
            refreshSessionParams.player.sessionExpirationDate = 119 * 60 * 1000; // 60 minutes after
            const newPlayer = await skillsGameOnApiClient.refreshPlayerSession(refreshSessionParams);
            expect(newPlayer.playerToken).equals(playerToken);
            expect(newPlayer.externalPlayerId).equals(externalPlayerId);
            expect(newPlayer.sessionId).equals(authPlayerResponse.sessionId);
            expect(newPlayer.sessionExpirationDate).equals(authPlayerResponse.sessionExpirationDate);
        });

        it('Returns a valid base augmented player', async () => {
            const testProfile = { name: 'test-name', avatar: 'test-avatar', color: 'test-color' };
            const authPlayerResponse = {
                sessionId: 'test-sessionId',
                sessionExpirationDate: 'test-date',
                sessionApiKey: 'test-key'
            };
            sinon.replace(skillsGameOnApiClient, 'authPlayer',
                sinon.fake.returns(authPlayerResponse));
            refreshSessionParams.player = {
                profile: testProfile,
                score: new PlayerScore(),
                ...refreshSessionParams.player
            } as AugmentedPlayer;
            const newPlayer = await skillsGameOnApiClient.refreshPlayerSession(
                refreshSessionParams as RefreshSessionParams<AugmentedPlayer>);
            expect(newPlayer.profile).deep.equals(testProfile);
            expect(newPlayer.playerToken).equals(playerToken);
            expect(newPlayer.externalPlayerId).equals(externalPlayerId);
            expect(newPlayer.sessionId).equals(authPlayerResponse.sessionId);
            expect(newPlayer.sessionExpirationDate).equals(authPlayerResponse.sessionExpirationDate);
            expect(newPlayer.score.rank).equals(0);
            expect(newPlayer.score.score).equals(0);
            expect(newPlayer.score.ordinalRank).equals('');
        });

    });

    describe('getPlayerScore', () => {
        let response;
        const matchId = 'test-id1';
        afterEach(() => {
            sinon.restore();
        });

        it('Converts match leaderboard to valid playerscore', async () => {
            response = { currentPlayer: {score: 1, rank: 1}};
            const playerScore = new PlayerScore();
            playerScore.rank = 1;
            playerScore.score = 1;
            playerScore.ordinalRank = '1st';
            playerScore.matchId = matchId;
            const getMatchLeaderboardForPlayerFake = sinon.fake.returns(response);
            sinon.replace(skillsGameOnApiClient, 'getMatchLeaderboardForPlayer', getMatchLeaderboardForPlayerFake);
            const getPlayerScoreResp = await skillsGameOnApiClient.getPlayerScore(
                matchId,
                player);
            expect(getPlayerScoreResp).to.deep.equal(playerScore);
        });

        it('Converts match leaderboard to valid playerscore with missing rank', async () => {
            response = { currentPlayer: {score: 1}};
            const playerScore = new PlayerScore();
            playerScore.score = 1;
            playerScore.matchId = matchId;
            const getMatchLeaderboardForPlayerFake = sinon.fake.returns(response);
            sinon.replace(skillsGameOnApiClient, 'getMatchLeaderboardForPlayer', getMatchLeaderboardForPlayerFake);
            const getPlayerScoreResp = await skillsGameOnApiClient.getPlayerScore(
                matchId,
                player);
            expect(getPlayerScoreResp).to.deep.equal(playerScore);
        });

        it('Returns default playerScore if player does not have leaderboard', async () => {
            response = undefined;
            const playerScore = new PlayerScore();
            playerScore.matchId = matchId;
            const getMatchLeaderboardForPlayerFake = sinon.fake.returns(response);
            sinon.replace(skillsGameOnApiClient, 'getMatchLeaderboardForPlayer', getMatchLeaderboardForPlayerFake);
            const getPlayerScoreResp = await skillsGameOnApiClient.getPlayerScore(
                matchId,
                player);
            expect(getPlayerScoreResp).to.deep.equal(playerScore);
        });

    });
});
