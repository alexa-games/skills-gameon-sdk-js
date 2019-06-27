/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import {
    ApiConfiguration,
    DefaultApiClient,
    EnterMatchRequest,
    EnterMatchResponse,
    EnterTournamentRequest,
    EnterTournamentResponse,
    GameOnApiClient,
    GetMatchDetailsResponse,
    GetMatchLeaderboardResponse,
    GetMatchLeaderboardResponseLeaderboardItem,
    GetMatchListResponse,
    GetMatchListResponseMatch,
    GetMatchListResponsePlayerGeneratedMatch,
    GetTournamentDetailsResponse,
    GetTournamentListResponse,
    GetTournamentListResponseTournament,
    SubmitScoreRequest
} from '@alexa-games/gameon-sdk';
import { PlayerProfile, PlayerProfileGenerator } from '..';

const NUMBER_OF_MS_PER_SECOND = 1000;
const NUMBER_OF_SECONDS_PER_MINUTE = 60;
const DEFAULT_REFRESH_SESSION_BUFFER = 60;
const RADIX_DECIMAL = 10;
// tslint:disable-next-line:no-var-requires
const ORDINAL = require('ordinal');
type OrdinalFunc = (num: number) => string;

/**
 * Tournament type
 */
export enum TournamentType {
    Admin = 'Admin',
    Player = 'Player'
}

/**
 * AuthPlayer params
 */
export interface AuthPlayerParams {
    /**
     * Used for authenticating a player device and is only required if advanced security is disabled.
     */
    playerToken?: string;
    /**
     * Player name e.g. 'hunkdory'
     */
    playerName?: string;
}

/**
 * EnterMatch params
 */
export interface EnterMatchParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Match Id
     */
    matchId: string;

    /**
     * GameOn EnterMatchRequest
     */
    enterMatchRequest?: EnterMatchRequest;
}

/**
 * EnterTournament params
 */
export interface EnterTournamentParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Tournament Id
     */
    tournamentId: string;

    /**
     * GameOn EnterTournamentRequest
     */
    enterTournamentRequest?: EnterTournamentRequest;

    /**
     * Specify whether to enter a regular (admin) or player tournament
     */
    tournamentType?: TournamentType;
}

/**
 * GetLeaderboard params
 */
export interface GetLeaderboardParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Match Id
     */
    matchId: string;

    /**
     * Maximum number of players in leaderboard that may be returned for a single request. Up to 100.
     */
    limit?: number;

    /**
     * Show current player's position in the leaderboard along with 'currentPlayerNeighbors' number of
     * players above and below the current player.
     */
    currentPlayerNeighbors?: number;

    /**
     * Pagination token from previous response
     */
    cursor?: string;
}

/**
 * GetMatchDetails params
 */
export interface GetMatchDetailsParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Match Id
     */
    matchId: string;

    /**
     * Player attributes e.g. '{"status": "vip", "skill": 1, "isActive": true}'
     */
    playerAttributes?: string;
}

/**
 * GetMatches params
 */
export interface GetMatchesParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Tournament Id
     */
    tournamentId?: string;

    /**
     * Filter matches based on tournament generator type.
     */
    matchType?: 'developer' | 'player-generated' | 'all';

    /**
     * Max number of matches to return.
     */
    limit?: number;

    /**
     * Player attributes e.g. '{"status": "vip", "skill": 1, "isActive": true}'
     */
    playerAttributes?: string;

    /**
     * Specify a given period e.g. 'day' for last 24 hours.
     */
    period?: 'day' | 'week' | 'month' | 'all';

    /**
     * Filter by player's status in match.
     */
    filterBy?: 'claimed-prizes' | 'unclaimed-prizes' | 'fulfilled-prizes' | 'prizes-won' | 'no-prizes-won' | 'live' | 'awaiting-process' | 'all';
}

/**
 * GetTournaments params
 */
export interface GetTournamentsParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Max number of tournaments to return.
     */
    limit?: number;

    /**
     * Filter the response list to either TEAM or INDIVIDUAL tournament type
     */
    participantType?: 'INDIVIDUAL' | 'TEAM';

    /**
     * Player attributes e.g. '{"status": "vip", "skill": 1, "isActive": true}'
     */
    playerAttributes?: string;

    /**
     * Specify a given period e.g. 'day' for last 24 hours.
     */
    period?: 'day' | 'week' | 'month' | 'all';

    /**
     * Filter by tournament's status.
     */
    filterBy?: 'upcoming' | 'live';
}

/**
 * GetTournamentDetails params
 */
export interface GetTournamentDetailsParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Tournament Id.
     */
    tournamentId: string;

    /**
     * Player attributes e.g. '{"status": "vip", "skill": 1, "isActive": true}'
     */
    playerAttributes?: string;
}

/**
 * SubmitScore params
 */
export interface SubmitScoreParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Match Id
     */
    matchId: string;

    /**
     * Player attributes e.g. '{"status": "vip", "skill": 1, "isActive": true}'
     */
    playerAttributes?: string;

    /**
     * Flag to enable checking if a match has been entered (and subsequently enter the match)
     */
    ensureMatchEntered?: boolean;

    /**
     * GameOn SubmitScoreRequest
     */
    submitScoreRequest: SubmitScoreRequest;
}

/**
 * InitializeNewAugmentedPlayer params
 */
export interface InitializeNewPlayerParams {
    /**
     * Game API key. This is provided when you register your game.
     */
    gameApiKey: string;

    /**
     * Set to `development` or `release`.
     */
    appBuildType: 'development' | 'release';

    /**
     * OS running on the player's device. Set to one of these values: alexa, fireos, android,
     * ios, pc, mac, linux, xbox, playstation, nintendo, or html.
     * Defaults to alexa if not specified
     */
    deviceOSType?: 'alexa' | 'fireos' | 'android' | 'ios' | 'pc' | 'mac' | 'linux' | 'xbox' | 'playstation' | 'nintendo' | 'html';
}

/**
 * Refresh session params
 */
export interface RefreshSessionParams<T extends Player> extends InitializeNewPlayerParams {
    /**
     * Player representation
     */
    player: T;

    /**
     * Number of minutes in advance of the session expiration time to refresh the session.
     * Defaults to 60 minutes.
     */
    refreshBufferInMinutes?: number;
}

/**
 * InitializeNewAugmentedPlayer params
 */
export interface InitializeNewAugmentedPlayerParams extends InitializeNewPlayerParams {

    /**
     * Generator for player profile
     */
    playerProfileGenerator: PlayerProfileGenerator;
}

/**
 * Sample set of leaderboards containing the top scoring players and neighboring players.
 */
export interface CombinationLeaderboard {
    /**
     * Leaderboard containing top players
     */
    topNLeaderboard: GetMatchLeaderboardResponseLeaderboardItem[];

    /**
     * Leaderboard containing neighboring players
     */
    neighborLeaderboard: GetMatchLeaderboardResponseLeaderboardItem[];
}

/**
 * Sample representation of a player's score
 */
export class PlayerScore {
    /**
     * Corresponding match Id
     */
    public matchId?: string;

    /**
     * Score of player
     */
    public score: number = 0;

    /**
     * Rank of player in leaderboard
     */
    public rank: number = 0;

    /**
     * Ordinal rank e.g. first, second, third
     */
    public ordinalRank: string = '';
}

/**
 * GetCombinationLeaderboards params
 */
export interface GetCombinationLeaderboardsParams {
    /**
     * Basic player representation
     */
    player: Player;

    /**
     * Match Id
     */
    matchId: string;

    /**
     * Number of players to retrieve in the top scoring leaderboard
     */
    topScoresLimit: number;

    /**
     * Number of neighboring players above and below the current player
     */
    playerNeighborsLimit: number;
}

/**
 * Basic player representation
 */
export interface Player {
    /**
     * Player Id for identifying this unique player
     */
    externalPlayerId: string;

    /**
     * Token used for authenticating a player device
     */
    playerToken?: string;

    /**
     * Active session Id
     */
    sessionId: string;

    /**
     * API key to be used with the session
     */
    sessionApiKey: string;

    /**
     * Expiration date of this session in milliseconds since epoch e.g. 1607760000000
     */
    sessionExpirationDate: number;
}

/**
 * Sample player representation
 */
export interface AugmentedPlayer extends Player {

    /**
     * Player Profile includes attributes such as name, color, and avatar
     */
    profile: PlayerProfile;

    /**
     * Score representation
     */
    score: PlayerScore;
}

/**
 * GameOnApiClient extension providing additional convenience methods
 */
export class SkillsGameOnApiClient extends GameOnApiClient {
    /**
     * Creates a new instance of SkillsGameOnApiClient
     * @param apiConfiguration
     */
    constructor(apiConfiguration: ApiConfiguration = {
        apiClient: new DefaultApiClient(),
        apiEndpoint: 'https://api.amazongameon.com/v1'
    }) {
        super(apiConfiguration);
    }

    /**
     * @desc Get the list of tournaments for the desired period optionally filtered by tournament status.
     * This will return both individual and team tournaments unless otherwise filtered.
     *
     * @param getTournamentsParams Parameters for method
     * @return GetTournamentListResponse
     */
    public async getTournamentListForPlayer(getTournamentsParams: GetTournamentsParams): Promise<GetTournamentListResponse> {
        return await this.getTournamentList(
            getTournamentsParams.player.sessionApiKey,
            getTournamentsParams.player.sessionId,
            getTournamentsParams.limit !== undefined ? getTournamentsParams.limit.toString(RADIX_DECIMAL) : undefined,
            getTournamentsParams.participantType,
            getTournamentsParams.playerAttributes,
            getTournamentsParams.period,
            getTournamentsParams.filterBy
        );
    }

    /**
     * @desc Get details of a tournament to allow players to see more information about the tournament.
     *
     * @param getTournamentDetailsParams Parameters for method
     * @return GetTournamentDetailsResponse
     */
    public async getTournamentDetailsForPlayer(getTournamentDetailsParams: GetTournamentDetailsParams): Promise<GetTournamentDetailsResponse> {
        return await this.getTournamentDetails(
            getTournamentDetailsParams.player.sessionId,
            getTournamentDetailsParams.tournamentId,
            getTournamentDetailsParams.player.sessionApiKey,
            getTournamentDetailsParams.playerAttributes
        );
    }

    /**
     * @desc Enter a tournament for the first time. This finds an open match within the tournament based
     * on the max number of matches per tournament and max number of players per match. In the case of a
     * team tournament, a teamId must be provided when entering.
     *
     * @param enterTournamentParams Parameters for method
     * @return EnterTournamentResponse
     */
    public async enterTournamentForPlayer(enterTournamentParams: EnterTournamentParams): Promise<EnterTournamentResponse> {
        if (!enterTournamentParams.enterTournamentRequest) {
            enterTournamentParams.enterTournamentRequest = {};
        }

        switch (enterTournamentParams.tournamentType) {
            case TournamentType.Admin:
                return await this.enterTournament(
                    enterTournamentParams.player.sessionId,
                    enterTournamentParams.player.sessionApiKey,
                    enterTournamentParams.tournamentId,
                    enterTournamentParams.enterTournamentRequest
                );
            case TournamentType.Player:
                return await this.enterPlayerTournament(
                    enterTournamentParams.player.sessionId,
                    enterTournamentParams.player.sessionApiKey,
                    enterTournamentParams.tournamentId,
                    enterTournamentParams.enterTournamentRequest
                );
            default:
                return await this.enterTournament(
                    enterTournamentParams.player.sessionId,
                    enterTournamentParams.player.sessionApiKey,
                    enterTournamentParams.tournamentId,
                    enterTournamentParams.enterTournamentRequest
                );
        }
    }

    /**
     * @desc Get the list of matches for the desired period optionally filtered by player's standing
     * in a match.
     *
     * @param getMatchesParams Parameters for method
     * @return GetMatchListResponse
     */
    public async getMatchListForPlayer(getMatchesParams: GetMatchesParams): Promise<GetMatchListResponse> {
        const response = await this.getMatchList(
            getMatchesParams.player.sessionApiKey,
            getMatchesParams.player.sessionId,
            getMatchesParams.matchType,
            getMatchesParams.limit !== undefined ? getMatchesParams.limit.toString(RADIX_DECIMAL) : undefined,
            getMatchesParams.playerAttributes,
            getMatchesParams.period,
            getMatchesParams.filterBy
        );

        if (getMatchesParams.tournamentId) {
            if (response.matches) {
                response.matches = response.matches.filter((item: GetMatchListResponseMatch) => {
                    return item.tournamentId === getMatchesParams!.tournamentId;
                });
            }
            if (response.playerMatches) {
                response.playerMatches = response.playerMatches.filter((item: GetMatchListResponsePlayerGeneratedMatch) => {
                    return item.tournamentId === getMatchesParams!.tournamentId;
                });
            }
        }
        return response;
    }

    /**
     * @desc Get match details for the requested player including attempts remaining, last score, highest
     * score and tournament details.
     *
     * @param getMatchDetailsParams Parameters for method
     * @return GetMatchDetailsResponse
     */
    public async getMatchDetailsForPlayer(getMatchDetailsParams: GetMatchDetailsParams): Promise<GetMatchDetailsResponse> {
        const response = await this.getMatchDetails(
            getMatchDetailsParams.matchId,
            getMatchDetailsParams.player.sessionId,
            getMatchDetailsParams.player.sessionApiKey,
            getMatchDetailsParams.playerAttributes
        );
        return response;
    }

    /**
     * @desc Re-enter a match within a tournament if a match allows multiple attempts.
     *
     * @param enterMatchParams Parameters for method
     * @return EnterMatchResponse
     */
    public async enterMatchForPlayer(enterMatchParams: EnterMatchParams): Promise<EnterMatchResponse> {
        if (!enterMatchParams.enterMatchRequest) {
            enterMatchParams.enterMatchRequest = {};
        }

        const response = await this.enterMatch(
            enterMatchParams.matchId,
            enterMatchParams.player.sessionId,
            enterMatchParams.player.sessionApiKey,
            enterMatchParams.enterMatchRequest
        );
        return response;
    }

    /**
     * @desc Submit player's score for each match attempt. For a team tournament, the score will
     * contribute to the team that the player is representing. Adds optional convenience functionality
     * to check if the player has entered the match. If not entered, attempts to enter match for player.
     * Makes up to 3 calls to GameOn (getMatchDetails, enterMatch, and submitScore)
     *
     * @param submitScoreParams Parameters for method
     */
    public async submitScoreForPlayer(submitScoreParams: SubmitScoreParams): Promise<void> {
        if (submitScoreParams.ensureMatchEntered) {
            const getMatchResponse = await this.getMatchDetailsForPlayer({
                matchId: submitScoreParams.matchId,
                playerAttributes: submitScoreParams.playerAttributes,
                player: submitScoreParams.player
            });

            if (getMatchResponse.canEnter) {
                await this.enterMatchForPlayer({
                    matchId: submitScoreParams.matchId,
                    // TODO: revisit this when GameOn updates their API to accept empty body
                    enterMatchRequest: {playerAttributes: {isActive: 'true'}},
                    player: submitScoreParams.player
                });
            }
        }

        await this.submitScore(
            submitScoreParams.matchId,
            submitScoreParams.player.sessionId,
            submitScoreParams.player.sessionApiKey,
            submitScoreParams.submitScoreRequest
        );

    }

    /**
     * @desc Get the top n participants for a match with the option to get participant's position in the leaderboard.
     * In the case where the tournament participantType is INDIVIDUAL the leaderboard will be representative of the
     * players and their positions with-in the tournament. If the tournament participantType is TEAM the leaderboard
     * will be representative of the teams and their positions with-in the tournament.
     *
     * @param getLeaderboardParams Parameters for method
     * @return GetMatchLeaderboardResponse
     */
    public async getMatchLeaderboardForPlayer(getLeaderboardParams: GetLeaderboardParams): Promise<GetMatchLeaderboardResponse> {
        const response = await this.getMatchLeaderboard(
            getLeaderboardParams.matchId,
            getLeaderboardParams.player.sessionApiKey,
            getLeaderboardParams.player.sessionId,
            getLeaderboardParams.limit !== undefined ? getLeaderboardParams.limit.toString(RADIX_DECIMAL) : undefined,
            getLeaderboardParams.currentPlayerNeighbors !== undefined ?
                getLeaderboardParams.currentPlayerNeighbors.toString(RADIX_DECIMAL) : undefined,
            getLeaderboardParams.cursor
        );
        return response;
    }

    /**
     * @desc Retrieves a list of tournaments with the specified title. Useful for recurring tournaments.
     *
     * @param tournamentName Name of tournament
     * @param player Basic player representation
     * @return Array of GetTournamentListResponseTournament.
     */
    public async getTournamentsByTitle(tournamentName: string, player: Player): Promise<GetTournamentListResponseTournament[]> {
        const tournamentResponse: GetTournamentListResponse = await this.getTournamentListForPlayer({player});
        if (tournamentResponse.tournaments) {
            return tournamentResponse.tournaments.filter((tournament: GetTournamentListResponseTournament) => {
                return tournament.title === tournamentName;
            });
        } else {
            return [];
        }
    }

    /**
     * @desc Retrieves the top-player leaderboard and player-neighbor leaderboard. If the current player is in the top-player leaderboard,
     * then the neighbor leaderboard will be empty.
     *
     * @param getCombinationLeaderboardsParams Parameters for method
     * @return CombinationLeaderboard
     */
    public async getCombinationLeaderboards({
                                                matchId,
                                                topScoresLimit,
                                                playerNeighborsLimit,
                                                player
                                            }: GetCombinationLeaderboardsParams): Promise<CombinationLeaderboard> {
        const neighborBoard = await this.getMatchLeaderboardForPlayer({
            matchId,
            currentPlayerNeighbors: playerNeighborsLimit,
            player
        });

        const topScores = await this.getMatchLeaderboardForPlayer(
            {matchId, limit: topScoresLimit, player});

        const leaderboard: CombinationLeaderboard = {
            topNLeaderboard: [],
            neighborLeaderboard: []
        };

        if (!topScores.leaderboard || topScores.leaderboard.length === 0) {
            return leaderboard;
        }

        // If the first neighbor is in the top scores, then merge the arrays.
        // Else push the top scores first and then the neighbor array.
        const neighborLeaderboard = (neighborBoard.neighbors ? neighborBoard.neighbors : []) as GetMatchLeaderboardResponseLeaderboardItem[];
        let topLeaderboard = (topScores.leaderboard ? topScores.leaderboard : []) as GetMatchLeaderboardResponseLeaderboardItem[];

        if (this.doLeaderboardsOverlap(topLeaderboard, neighborLeaderboard)) {
            topLeaderboard = this.mergeOverlappingLeaderboards(topLeaderboard, neighborLeaderboard);
        } else {
            leaderboard.neighborLeaderboard = neighborLeaderboard;
        }
        leaderboard.topNLeaderboard = topLeaderboard;
        return leaderboard;
    }

    /**
     * @desc Registers and authenticates a new player.
     *
     * @param InitializeNewPlayerParams Parameters for method
     * @return Player
     */
    public async initializeNewPlayer({
                                         gameApiKey,
                                         deviceOSType,
                                         appBuildType
                                     }: InitializeNewPlayerParams): Promise<Player> {
        const registerPlayerResponse = await this.registerPlayer(gameApiKey, {});
        const authPlayerResponse = await this.authPlayer(gameApiKey,
            {
                playerToken: registerPlayerResponse.playerToken,
                appBuildType,
                deviceOSType: deviceOSType ? deviceOSType : 'alexa'
            });
        if (!authPlayerResponse || !authPlayerResponse.sessionId) {
            throw new Error('Response from authenticate player does not contain a session Id');
        }

        const player: Player = {
            playerToken: registerPlayerResponse.playerToken,
            externalPlayerId: registerPlayerResponse.externalPlayerId,
            sessionId: authPlayerResponse.sessionId,
            sessionExpirationDate: authPlayerResponse.sessionExpirationDate,
            sessionApiKey: authPlayerResponse.sessionApiKey
        };

        return player;
    }

    /**
     * @desc Registers and authenticates a new augmented player.
     *
     * @param initializeNewAugmentedPlayerParams Parameters for method
     * @return AugmentedPlayer
     */
    public async initializeNewAugmentedPlayer({
                                                  gameApiKey,
                                                  deviceOSType,
                                                  appBuildType,
                                                  playerProfileGenerator
                                              }: InitializeNewAugmentedPlayerParams): Promise<AugmentedPlayer> {
        const registerPlayerResponse = await this.registerPlayer(gameApiKey, {});
        const playerProfile = playerProfileGenerator.getPlayerProfileFromId(registerPlayerResponse.externalPlayerId);
        const authPlayerResponse = await this.authPlayer(gameApiKey,
            {
                playerToken: registerPlayerResponse.playerToken,
                playerName: playerProfile.name,
                appBuildType,
                deviceOSType: deviceOSType ? deviceOSType : 'alexa'
            });
        if (!authPlayerResponse || !authPlayerResponse.sessionId) {
            throw new Error('Response from authenticate player does not contain a session Id');
        }

        const player = {
            profile: playerProfile,
            playerToken: registerPlayerResponse.playerToken,
            externalPlayerId: registerPlayerResponse.externalPlayerId,
            sessionId: authPlayerResponse.sessionId,
            sessionExpirationDate: authPlayerResponse.sessionExpirationDate,
            sessionApiKey: authPlayerResponse.sessionApiKey,
            score: new PlayerScore()
        };

        return player;
    }

    /**
     * @desc Refresh a player session by retrieving a new sessionId and sessionApiKey from Gameon.
     * If the session has not expired, then do nothing. If the refreshBufferInMinutes is specified, then the session
     * will be refreshed in advance by the specified time in minutes.
     *
     * @param RefreshSessionParams Parameters for method
     * @return Player
     */
    public async refreshPlayerSession<U extends Player>(
        {
            gameApiKey,
            deviceOSType,
            appBuildType,
            player,
            refreshBufferInMinutes
        }: RefreshSessionParams<U>): Promise<U> {

        let name;
        if (this.isAugmented(player)) {
            name = player.profile.name;
        }

        if (this.shouldRefreshSession(player.sessionExpirationDate, refreshBufferInMinutes)) {
            const authPlayerResponse = await this.authPlayer(gameApiKey,
                {
                    playerToken: player.playerToken,
                    playerName: name,
                    appBuildType,
                    deviceOSType: deviceOSType ? deviceOSType : 'alexa'
                });
            if (!authPlayerResponse || !authPlayerResponse.sessionId) {
                throw new Error('Response from authenticate player does not contain a session Id');
            }
            player.sessionApiKey = authPlayerResponse.sessionApiKey;
            player.sessionExpirationDate = authPlayerResponse.sessionExpirationDate;
            player.sessionId = authPlayerResponse.sessionId;
        }

        return player;
    }

    /**
     * @desc Retrieve the PlayerScore for the current player
     *
     * @param matchId Id of the current match
     * @param player Basic player representation
     * @return PlayerScore
     */
    public async getPlayerScore(matchId: string, player: Player): Promise<PlayerScore> {
        const matchLeaderboard = await this.getMatchLeaderboardForPlayer({matchId, currentPlayerNeighbors: 1, player});
        const playerScore = new PlayerScore();
        playerScore.matchId = matchId;

        if (matchLeaderboard && matchLeaderboard.currentPlayer) {
            playerScore.score = matchLeaderboard.currentPlayer.score;

            if (matchLeaderboard.currentPlayer.rank !== undefined) {
                playerScore.rank = matchLeaderboard.currentPlayer.rank;
                playerScore.ordinalRank = this.getOrdinal(playerScore.rank);
            }
        }

        return playerScore;
    }

    private shouldRefreshSession(sessionExpirationDate: number, refreshBufferInMinutes?: number): boolean {
        const currentTimeInMs = new Date().getTime();
        let refreshBufferInMs = DEFAULT_REFRESH_SESSION_BUFFER * NUMBER_OF_SECONDS_PER_MINUTE * NUMBER_OF_MS_PER_SECOND;
        if (refreshBufferInMinutes !== undefined) {
            refreshBufferInMs = refreshBufferInMinutes * NUMBER_OF_SECONDS_PER_MINUTE * NUMBER_OF_MS_PER_SECOND;
        }
        if (sessionExpirationDate - refreshBufferInMs > currentTimeInMs) {
            return false;
        }
        return true;
    }

    private isAugmented(player: Player | AugmentedPlayer): player is AugmentedPlayer {
        return player.hasOwnProperty('profile');
    }

    private getOrdinal(num: number, ordinal: OrdinalFunc = ORDINAL): string {
        return ordinal(num);
    }

    private doLeaderboardsOverlap(higherRankLeaderboard: GetMatchLeaderboardResponseLeaderboardItem[],
                                  lowerRankLeaderboard: GetMatchLeaderboardResponseLeaderboardItem[] | undefined) {
        if (!lowerRankLeaderboard || !lowerRankLeaderboard[0].rank || !higherRankLeaderboard[higherRankLeaderboard.length - 1].rank) {
            return false;
        }
        return lowerRankLeaderboard[0].rank <= higherRankLeaderboard[higherRankLeaderboard.length - 1].rank!; // Remove ! when GameOn model updated
    }

    private mergeOverlappingLeaderboards(topLeaderboard: GetMatchLeaderboardResponseLeaderboardItem[],
                                         neighborLeaderboard: GetMatchLeaderboardResponseLeaderboardItem[]) {
        const neighborStartIndex = neighborLeaderboard[0].rank! - 1; // Remove ! when GameOn model updated
        topLeaderboard.splice(neighborStartIndex, neighborLeaderboard.length, ...neighborLeaderboard);
        return topLeaderboard;
    }
}
