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
/* tslint:disable */

import { ApiConfiguration } from '../http/apiClient';
import { ApiClient } from './apiClient';
/**
 *
 * @interface
 */
export interface AddAttemptsRequest {
    'addAttempts': number;
}

/**
 *
 * @interface
 */
export interface AddAttemptsResponse {
    'attemptsRemaining': number;
}

/**
 *
 * @interface
 */
export interface AddPlayerTournamentRequest {
    'imageUrl'?: string;
    'title': string;
    'subtitle'?: string;
    'description'?: string;
    'winType'?: string;
    'metadata'?: string;
    'dateStart': number;
    'dateEnd': number;
    'playersPerMatch': number;
    'playerAttemptsPerMatch': number;
    'generateAccessKey'?: boolean;
    'scoreType'?: string;
    'leaderboardStat'?: string;
}

/**
 *
 * @interface
 */
export interface AddPlayerTournamentResponse {
    'accessKey'?: string;
    'dateEnd': number;
    'dateStart': number;
    'description'?: string;
    'leaderboardStat'?: string;
    'matchId': string;
    'metadata'?: string;
    'playerAttemptsPerMatch': number;
    'playersPerMatch': number;
    'scoreType'?: string;
    'subtitle'?: string;
    'title': string;
    'tournamentId': string;
    'winType'?: string;
}

/**
 *
 * @interface
 */
export interface AuthPlayerRequest {
    'encryptedPayload'?: string;
    'playerToken'?: string;
    'playerName'?: string;
    'devicePushNotificationToken'?: string;
    'deviceOSType': string;
    'appBuildType': string;
}

/**
 *
 * @interface
 */
export interface AuthPlayerResponse {
    'sessionApiKey': string;
    'sessionExpirationDate': number;
    'sessionId': string;
}

/**
 *
 * @interface
 */
export interface ClaimPrizeListRequest {
    'awardedPrizeIds': Array<string>;
}

/**
 *
 * @interface
 */
export interface ClaimPrizeListResponse {
    'externalPlayerId': string;
    'failedAwardedPrizeIds'?: Array<string>;
    'prizes'?: Array<ClaimPrizeListResponseClaimedPrize>;
}

/**
 *
 * @interface
 */
export interface ClaimPrizeListResponseClaimedPrize {
    'awardedPrizeId': string;
    'dateOfExpiration'?: number;
    'description'?: string;
    'encryptedPrizeInfo': string;
    'encryptedPrizeInfoV2': string;
    'imageUrl'?: string;
    'matchId': string;
    'prizeInfo': string;
    'prizeInfoType': string;
    'status': string;
    'title': string;
}

/**
 *
 * @interface
 */
export interface EnterMatchRequest {
    'playerAttributes'?: { [key: string]: string; };
}

/**
 *
 * @interface
 */
export interface EnterMatchResponse {
    'attemptsRemaining': number;
    'matchId': string;
    'metadata'?: string;
    'teamId'?: string;
    'tournamentId': string;
}

/**
 *
 * @interface
 */
export interface EnterTournamentRequest {
    'playerAttributes'?: { [key: string]: string; };
    'accessKey'?: string;
    'teamId'?: string;
}

/**
 *
 * @interface
 */
export interface EnterTournamentResponse {
    'attemptsRemaining': number;
    'matchId': string;
    'metadata'?: string;
    'tournamentId': string;
}

/**
 *
 * @interface
 */
export interface FulfillPrizeListRequest {
    'awardedPrizeIds': Array<string>;
}

/**
 *
 * @interface
 */
export interface FulfillPrizeListResponse {
    'externalPlayerId': string;
    'failedAwardedPrizeIds'?: Array<string>;
    'prizes'?: Array<FulfillPrizeListResponseFulfilledPrize>;
}

/**
 *
 * @interface
 */
export interface FulfillPrizeListResponseFulfilledPrize {
    'awardedPrizeId': string;
    'dateOfExpiration'?: number;
    'description'?: string;
    'encryptedPrizeInfo': string;
    'encryptedPrizeInfoV2': string;
    'imageUrl'?: string;
    'matchId': string;
    'prizeInfo': string;
    'prizeInfoType': string;
    'status': string;
    'title': string;
}

/**
 *
 * @interface
 */
export interface GetMatchDetailsResponse {
    'attemptsRemaining'?: number;
    'awardedPrizes'?: Array<GetMatchDetailsResponseAwardedPrize>;
    'canEnter': boolean;
    'lastScore'?: number;
    'lastScoreDate'?: number;
    'matchId': string;
    'score'?: number;
    'scoreDate'?: number;
    'teamId'?: string;
    'tournamentDetails': GetMatchDetailsResponseTournamentDetails;
}

/**
 *
 * @interface
 */
export interface GetMatchDetailsResponseAwardedPrize {
    'awardedPrizeId': string;
    'dateOfExpiration'?: number;
    'description'?: string;
    'imageUrl'?: string;
    'prizeInfoType': string;
    'prizeTitle': string;
    'status': string;
}

/**
 *
 * @interface
 */
export interface GetMatchDetailsResponsePrizeBundle {
    'description'?: string;
    'imageUrl'?: string;
    'prizeIds': Array<string>;
    'rankFrom': number;
    'rankTo': number;
    'title': string;
}

/**
 *
 * @interface
 */
export interface GetMatchDetailsResponseTournamentDetails {
    'accessKey'?: string;
    'countryCodes'?: Array<string>;
    'creatorExternalPlayerId'?: string;
    'creatorPlayerName'?: string;
    'dateEnd': number;
    'dateStart': number;
    'description'?: string;
    'imageUrl'?: string;
    'leaderboardStat'?: string;
    'metadata'?: string;
    'playerAttemptsPerMatch': number;
    'playersPerMatch': number;
    'prizeBundles'?: Array<GetMatchDetailsResponsePrizeBundle>;
    'subtitle'?: string;
    'title': string;
    'tournamentId': string;
    'tournamentState': string;
}

/**
 *
 * @interface
 */
export interface GetMatchLeaderboardResponse {
    'currentPlayer'?: GetMatchLeaderboardResponseLeaderboardItem;
    'currentTeam'?: GetMatchLeaderboardResponseLeaderboardItem;
    'leaderboard'?: Array<GetMatchLeaderboardResponseLeaderboardItem>;
    'leaderboardStat'?: string;
    'neighbors'?: Array<GetMatchLeaderboardResponseLeaderboardItem>;
    'next'?: string;
}

/**
 *
 * @interface
 */
export interface GetMatchLeaderboardResponseLeaderboardItem {
    'externalPlayerId'?: string;
    'hasPlayerContributed'?: boolean;
    'isCurrentPlayer'?: boolean;
    'playerIconUrl'?: string;
    'playerName'?: string;
    'rank'?: number;
    'score': number;
    'teamId'?: string;
    'teamName'?: string;
}

/**
 *
 * @interface
 */
export interface GetMatchListResponse {
    'matches'?: Array<GetMatchListResponseMatch>;
    'playerMatches'?: Array<GetMatchListResponsePlayerGeneratedMatch>;
}

/**
 *
 * @interface
 */
export interface GetMatchListResponseMatch {
    'attemptsRemaining'?: number;
    'canEnter': boolean;
    'dateEnd': number;
    'dateStart': number;
    'imageUrl'?: string;
    'leaderboardStat'?: string;
    'matchId': string;
    'matchesPerPlayer': number;
    'metadata'?: string;
    'playerAttemptsPerMatch': number;
    'playersPerMatch': number;
    'prizeBundleClaimStatus'?: string;
    'prizeBundles': Array<GetMatchListResponsePrizeBundle>;
    'scoreType': string;
    'subtitle'?: string;
    'teamId'?: string;
    'title': string;
    'tournamentId': string;
    'tournamentState': string;
    'winType'?: string;
}

/**
 *
 * @interface
 */
export interface GetMatchListResponsePlayerGeneratedMatch {
    'attemptsRemaining'?: number;
    'creatorPlayerName': string;
    'dateEnd': number;
    'dateStart': number;
    'imageUrl'?: string;
    'leaderboardStat'?: string;
    'matchId': string;
    'metadata'?: string;
    'playerAttemptsPerMatch': number;
    'playersPerMatch': number;
    'scoreType': string;
    'subtitle'?: string;
    'title': string;
    'tournamentId': string;
    'tournamentState': string;
    'winType'?: string;
}

/**
 *
 * @interface
 */
export interface GetMatchListResponsePrizeBundle {
    'description'?: string;
    'imageUrl'?: string;
    'prizeIds': Array<string>;
    'rankFrom': number;
    'rankTo': number;
    'title': string;
}

/**
 *
 * @interface
 */
export interface GetPlayerTournamentDetailsResponse {
    'accessKey'?: string;
    'creatorExternalPlayerId'?: string;
    'creatorPlayerIconUrl'?: string;
    'creatorPlayerName': string;
    'dateEnd': number;
    'dateStart': number;
    'description'?: string;
    'hasAccessKey': boolean;
    'imageUrl'?: string;
    'leaderboardStat'?: string;
    'matchId'?: string;
    'metadata'?: string;
    'playerAttemptsPerMatch': number;
    'playersEntered'?: number;
    'playersPerMatch': number;
    'scoreType': string;
    'streamingPlatform'?: string;
    'subtitle'?: string;
    'title': string;
    'tournamentId': string;
    'tournamentState': string;
    'winType': string;
}

/**
 *
 * @interface
 */
export interface GetPlayerTournamentListResponse {
    'next'?: string;
    'tournaments'?: Array<GetPlayerTournamentListResponseTournament>;
}

/**
 *
 * @interface
 */
export interface GetPlayerTournamentListResponseTournament {
    'accessKey'?: string;
    'creatorExternalPlayerId'?: string;
    'creatorPlayerIconUrl'?: string;
    'creatorPlayerName': string;
    'dateEnd': number;
    'dateStart': number;
    'description'?: string;
    'hasAccessKey': boolean;
    'imageUrl'?: string;
    'leaderboardStat'?: string;
    'matchId'?: string;
    'metadata'?: string;
    'playerAttemptsPerMatch': number;
    'playersEntered'?: number;
    'playersPerMatch': number;
    'scoreType': string;
    'streamingPlatform'?: string;
    'subtitle'?: string;
    'title': string;
    'tournamentId': string;
    'tournamentState': string;
    'winType': string;
}

/**
 *
 * @interface
 */
export interface GetPrizeDetailsResponse {
    'dateCreated': number;
    'dateOfExpiration'?: number;
    'description'?: string;
    'imageUrl'?: string;
    'prizeId': string;
    'prizeInfoType': string;
    'title': string;
}

/**
 *
 * @interface
 */
export interface GetTeamDetailsResponse {
    'externalPlayerIds': Array<string>;
    'imageUrl'?: string;
    'isPlayerInTeam'?: boolean;
    'teamId': string;
    'teamName': string;
    'teamSizeMax': number;
}

/**
 *
 * @interface
 */
export interface GetTournamentDetailsResponse {
    'canEnter': boolean;
    'countryCodes'?: Array<string>;
    'dateEnd': number;
    'dateStart': number;
    'description'?: string;
    'eligibleTeamIds'?: Array<string>;
    'hasAccessKey': boolean;
    'imageUrl'?: string;
    'leaderboardStat'?: string;
    'matchesPerPlayer': number;
    'metadata'?: string;
    'participantType': string;
    'playerAttemptsPerMatch': number;
    'playersPerMatch': number;
    'prizeBundles': Array<GetTournamentDetailsResponsePrizeBundle>;
    'scoreType': string;
    'subtitle'?: string;
    'teamSizeMax'?: number;
    'teamSizeMin'?: number;
    'title': string;
    'tournamentId': string;
    'tournamentState': string;
    'winType': string;
}

/**
 *
 * @interface
 */
export interface GetTournamentDetailsResponsePrizeBundle {
    'description'?: string;
    'imageUrl'?: string;
    'prizeIds': Array<string>;
    'rankFrom': number;
    'rankTo': number;
    'title': string;
}

/**
 *
 * @interface
 */
export interface GetTournamentListResponse {
    'tournaments'?: Array<GetTournamentListResponseTournament>;
}

/**
 *
 * @interface
 */
export interface GetTournamentListResponsePrizeBundle {
    'description'?: string;
    'imageUrl'?: string;
    'prizeIds': Array<string>;
    'rankFrom': number;
    'rankTo': number;
    'title': string;
}

/**
 *
 * @interface
 */
export interface GetTournamentListResponseTournament {
    'canEnter': boolean;
    'countryCodes'?: Array<string>;
    'dateEnd': number;
    'dateStart': number;
    'description'?: string;
    'eligibleTeamIds'?: Array<string>;
    'hasAccessKey': boolean;
    'imageUrl'?: string;
    'leaderboardStat'?: string;
    'matchesPerPlayer': number;
    'metadata'?: string;
    'participantType': string;
    'playerAttemptsPerMatch': number;
    'playersPerMatch': number;
    'prizeBundles': Array<GetTournamentListResponsePrizeBundle>;
    'scoreType': string;
    'subtitle'?: string;
    'teamSizeMax'?: number;
    'teamSizeMin'?: number;
    'title': string;
    'tournamentId': string;
    'tournamentState': string;
    'winType': string;
}

/**
 *
 * @interface
 */
export interface RegisterPlayerRequest {
    'encryptedPayload'?: string;
    'vendorPlayerId'?: string;
}

/**
 *
 * @interface
 */
export interface RegisterPlayerResponse {
    'encryptedPlayerToken'?: string;
    'externalPlayerId': string;
    'playerToken'?: string;
}

/**
 *
 * @interface
 */
export interface SubmitScoreRequest {
    'score'?: number;
    'stats'?: Array<SubmitScoreRequestStats>;
}

/**
 *
 * @interface
 */
export interface SubmitScoreRequestStats {
    'name': string;
    'value': number;
}

/**
 *
 * @interface
 */
export interface UpdatePlayerTournamentRequest {
    'title'?: string;
    'subtitle'?: string;
    'description'?: string;
    'metadata'?: string;
    'generateAccessKey'?: boolean;
}

/**
 *
 * @interface
 */
export interface UpdatePlayerTournamentResponse {
    'accessKey'?: string;
    'tournamentId'?: string;
}

/**
 *
 * @interface
 */
export interface UseStreamingPlatformAccountLinkingCodeRequest {
    'code': string;
}

/**
 *
 */
export class GameOnApiClient extends ApiClient {
    constructor(apiConfiguration : ApiConfiguration) {
        super(apiConfiguration);
    }

    /**
     *
     * @param {string} matchId
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {AddAttemptsRequest} addAttemptsRequest
     */
    async addAttempts(matchId : string, sessionId : string, xApiKey : string, addAttemptsRequest : AddAttemptsRequest) : Promise<AddAttemptsResponse> {
        const __operationId__ = 'addAttempts';
        // verify required parameter 'matchId' is not null or undefined
        if (matchId == null) {
            throw new Error(`Required parameter matchId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'addAttemptsRequest' is not null or undefined
        if (addAttemptsRequest == null) {
            throw new Error(`Required parameter addAttemptsRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('matchId', matchId);


        let path : string = "/matches/{matchId}/attempts";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");
        errorDefinitions.set(429, "429 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, addAttemptsRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {AddPlayerTournamentRequest} addPlayerTournamentRequest
     */
    async addPlayerTournament(sessionId : string, xApiKey : string, addPlayerTournamentRequest : AddPlayerTournamentRequest) : Promise<AddPlayerTournamentResponse> {
        const __operationId__ = 'addPlayerTournament';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'addPlayerTournamentRequest' is not null or undefined
        if (addPlayerTournamentRequest == null) {
            throw new Error(`Required parameter addPlayerTournamentRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/player-tournaments";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, addPlayerTournamentRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} xApiKey
     * @param {AuthPlayerRequest} authPlayerRequest
     */
    async authPlayer(xApiKey : string, authPlayerRequest : AuthPlayerRequest) : Promise<AuthPlayerResponse> {
        const __operationId__ = 'authPlayer';
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'authPlayerRequest' is not null or undefined
        if (authPlayerRequest == null) {
            throw new Error(`Required parameter authPlayerRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players/auth";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, authPlayerRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {ClaimPrizeListRequest} claimPrizeListRequest
     */
    async claimPrizeList(sessionId : string, xApiKey : string, claimPrizeListRequest : ClaimPrizeListRequest) : Promise<ClaimPrizeListResponse> {
        const __operationId__ = 'claimPrizeList';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'claimPrizeListRequest' is not null or undefined
        if (claimPrizeListRequest == null) {
            throw new Error(`Required parameter claimPrizeListRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/prizes/claim";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(207, "207 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, claimPrizeListRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} matchId
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {EnterMatchRequest} enterMatchRequest
     */
    async enterMatch(matchId : string, sessionId : string, xApiKey : string, enterMatchRequest : EnterMatchRequest) : Promise<EnterMatchResponse> {
        const __operationId__ = 'enterMatch';
        // verify required parameter 'matchId' is not null or undefined
        if (matchId == null) {
            throw new Error(`Required parameter matchId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'enterMatchRequest' is not null or undefined
        if (enterMatchRequest == null) {
            throw new Error(`Required parameter enterMatchRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('matchId', matchId);


        let path : string = "/matches/{matchId}/enter";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");
        errorDefinitions.set(429, "429 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, enterMatchRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {string} tournamentId
     * @param {EnterTournamentRequest} enterTournamentRequest
     */
    async enterPlayerTournament(sessionId : string, xApiKey : string, tournamentId : string, enterTournamentRequest : EnterTournamentRequest) : Promise<EnterTournamentResponse> {
        const __operationId__ = 'enterPlayerTournament';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'tournamentId' is not null or undefined
        if (tournamentId == null) {
            throw new Error(`Required parameter tournamentId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'enterTournamentRequest' is not null or undefined
        if (enterTournamentRequest == null) {
            throw new Error(`Required parameter enterTournamentRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('tournamentId', tournamentId);


        let path : string = "/player-tournaments/{tournamentId}/enter";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, enterTournamentRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {string} tournamentId
     * @param {EnterTournamentRequest} enterTournamentRequest
     */
    async enterTournament(sessionId : string, xApiKey : string, tournamentId : string, enterTournamentRequest : EnterTournamentRequest) : Promise<EnterTournamentResponse> {
        const __operationId__ = 'enterTournament';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'tournamentId' is not null or undefined
        if (tournamentId == null) {
            throw new Error(`Required parameter tournamentId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'enterTournamentRequest' is not null or undefined
        if (enterTournamentRequest == null) {
            throw new Error(`Required parameter enterTournamentRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('tournamentId', tournamentId);


        let path : string = "/tournaments/{tournamentId}/enter";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, enterTournamentRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {FulfillPrizeListRequest} fulfillPrizeListRequest
     */
    async fulfillPrizeList(sessionId : string, xApiKey : string, fulfillPrizeListRequest : FulfillPrizeListRequest) : Promise<FulfillPrizeListResponse> {
        const __operationId__ = 'fulfillPrizeList';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'fulfillPrizeListRequest' is not null or undefined
        if (fulfillPrizeListRequest == null) {
            throw new Error(`Required parameter fulfillPrizeListRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/prizes/fulfill";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(207, "207 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, fulfillPrizeListRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} matchId
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {string} playerAttributes
     */
    async getMatchDetails(matchId : string, sessionId : string, xApiKey : string, playerAttributes? : string) : Promise<GetMatchDetailsResponse> {
        const __operationId__ = 'getMatchDetails';
        // verify required parameter 'matchId' is not null or undefined
        if (matchId == null) {
            throw new Error(`Required parameter matchId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();
        if(playerAttributes != null) {
            queryParams.set('playerAttributes', playerAttributes);
        }

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('matchId', matchId);


        let path : string = "/matches/{matchId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} matchId
     * @param {string} xApiKey
     * @param {string} sessionId
     * @param {string} limit
     * @param {string} currentPlayerNeighbors
     * @param {string} cursor
     */
    async getMatchLeaderboard(matchId : string, xApiKey : string, sessionId? : string, limit? : string, currentPlayerNeighbors? : string, cursor? : string) : Promise<GetMatchLeaderboardResponse> {
        const __operationId__ = 'getMatchLeaderboard';
        // verify required parameter 'matchId' is not null or undefined
        if (matchId == null) {
            throw new Error(`Required parameter matchId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();
        if(limit != null) {
            queryParams.set('limit', limit);
        }
        if(currentPlayerNeighbors != null) {
            queryParams.set('currentPlayerNeighbors', currentPlayerNeighbors);
        }
        if(cursor != null) {
            queryParams.set('cursor', cursor);
        }

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        if(sessionId != null) {
            headerParams.push({key : 'session-id', value : sessionId});
        }
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('matchId', matchId);


        let path : string = "/matches/{matchId}/leaderboard";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} xApiKey
     * @param {string} sessionId
     * @param {string} matchType
     * @param {string} limit
     * @param {string} playerAttributes
     * @param {string} period
     * @param {string} filterBy
     */
    async getMatchList(xApiKey : string, sessionId : string, matchType? : string, limit? : string, playerAttributes? : string, period? : string, filterBy? : string) : Promise<GetMatchListResponse> {
        const __operationId__ = 'getMatchList';
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();
        if(matchType != null) {
            queryParams.set('matchType', matchType);
        }
        if(limit != null) {
            queryParams.set('limit', limit);
        }
        if(playerAttributes != null) {
            queryParams.set('playerAttributes', playerAttributes);
        }
        if(period != null) {
            queryParams.set('period', period);
        }
        if(filterBy != null) {
            queryParams.set('filterBy', filterBy);
        }

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'x-api-key', value : xApiKey});
        headerParams.push({key : 'session-id', value : sessionId});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/matches";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {string} tournamentId
     */
    async getPlayerTournamentDetails(sessionId : string, xApiKey : string, tournamentId : string) : Promise<GetPlayerTournamentDetailsResponse> {
        const __operationId__ = 'getPlayerTournamentDetails';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'tournamentId' is not null or undefined
        if (tournamentId == null) {
            throw new Error(`Required parameter tournamentId was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('tournamentId', tournamentId);


        let path : string = "/player-tournaments/{tournamentId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} xApiKey
     * @param {string} sessionId
     * @param {string} queryBy
     * @param {string} limit
     * @param {string} cursor
     * @param {string} streamingPlatform
     * @param {string} period
     * @param {string} filterBy
     */
    async getPlayerTournamentList(xApiKey : string, sessionId : string, queryBy? : string, limit? : string, cursor? : string, streamingPlatform? : string, period? : string, filterBy? : string) : Promise<GetPlayerTournamentListResponse> {
        const __operationId__ = 'getPlayerTournamentList';
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();
        if(queryBy != null) {
            queryParams.set('queryBy', queryBy);
        }
        if(limit != null) {
            queryParams.set('limit', limit);
        }
        if(cursor != null) {
            queryParams.set('cursor', cursor);
        }
        if(streamingPlatform != null) {
            queryParams.set('streamingPlatform', streamingPlatform);
        }
        if(period != null) {
            queryParams.set('period', period);
        }
        if(filterBy != null) {
            queryParams.set('filterBy', filterBy);
        }

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'x-api-key', value : xApiKey});
        headerParams.push({key : 'session-id', value : sessionId});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/player-tournaments";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {string} prizeId
     */
    async getPrizeDetails(sessionId : string, xApiKey : string, prizeId : string) : Promise<GetPrizeDetailsResponse> {
        const __operationId__ = 'getPrizeDetails';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'prizeId' is not null or undefined
        if (prizeId == null) {
            throw new Error(`Required parameter prizeId was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('prizeId', prizeId);


        let path : string = "/prizes/{prizeId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {string} teamId
     */
    async getTeamDetails(sessionId : string, xApiKey : string, teamId : string) : Promise<GetTeamDetailsResponse> {
        const __operationId__ = 'getTeamDetails';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'teamId' is not null or undefined
        if (teamId == null) {
            throw new Error(`Required parameter teamId was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('teamId', teamId);


        let path : string = "/teams/{teamId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} tournamentId
     * @param {string} xApiKey
     * @param {string} playerAttributes
     */
    async getTournamentDetails(sessionId : string, tournamentId : string, xApiKey : string, playerAttributes? : string) : Promise<GetTournamentDetailsResponse> {
        const __operationId__ = 'getTournamentDetails';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'tournamentId' is not null or undefined
        if (tournamentId == null) {
            throw new Error(`Required parameter tournamentId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();
        if(playerAttributes != null) {
            queryParams.set('playerAttributes', playerAttributes);
        }

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('tournamentId', tournamentId);


        let path : string = "/tournaments/{tournamentId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} xApiKey
     * @param {string} sessionId
     * @param {string} limit
     * @param {string} participantType
     * @param {string} playerAttributes
     * @param {string} period
     * @param {string} filterBy
     */
    async getTournamentList(xApiKey : string, sessionId : string, limit? : string, participantType? : string, playerAttributes? : string, period? : string, filterBy? : string) : Promise<GetTournamentListResponse> {
        const __operationId__ = 'getTournamentList';
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();
        if(limit != null) {
            queryParams.set('limit', limit);
        }
        if(participantType != null) {
            queryParams.set('participantType', participantType);
        }
        if(playerAttributes != null) {
            queryParams.set('playerAttributes', playerAttributes);
        }
        if(period != null) {
            queryParams.set('period', period);
        }
        if(filterBy != null) {
            queryParams.set('filterBy', filterBy);
        }

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'x-api-key', value : xApiKey});
        headerParams.push({key : 'session-id', value : sessionId});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/tournaments";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async matchesMatchIdAttemptsOptions() : Promise<void> {
        const __operationId__ = 'matchesMatchIdAttemptsOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/matches/{matchId}/attempts";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async matchesMatchIdEnterOptions() : Promise<void> {
        const __operationId__ = 'matchesMatchIdEnterOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/matches/{matchId}/enter";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async matchesMatchIdLeaderboardOptions() : Promise<void> {
        const __operationId__ = 'matchesMatchIdLeaderboardOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/matches/{matchId}/leaderboard";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async matchesMatchIdOptions() : Promise<void> {
        const __operationId__ = 'matchesMatchIdOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/matches/{matchId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async matchesMatchIdScoreOptions() : Promise<void> {
        const __operationId__ = 'matchesMatchIdScoreOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/matches/{matchId}/score";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async matchesOptions() : Promise<void> {
        const __operationId__ = 'matchesOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/matches";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async playerTournamentsOptions() : Promise<void> {
        const __operationId__ = 'playerTournamentsOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/player-tournaments";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async playerTournamentsTournamentIdEnterOptions() : Promise<void> {
        const __operationId__ = 'playerTournamentsTournamentIdEnterOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/player-tournaments/{tournamentId}/enter";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async playerTournamentsTournamentIdOptions() : Promise<void> {
        const __operationId__ = 'playerTournamentsTournamentIdOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/player-tournaments/{tournamentId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async playersAuthOptions() : Promise<void> {
        const __operationId__ = 'playersAuthOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players/auth";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async playersOptions() : Promise<void> {
        const __operationId__ = 'playersOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} xApiKey
     * @param {string} sessionId
     */
    async playersPatch(xApiKey : string, sessionId? : string) : Promise<void> {
        const __operationId__ = 'playersPatch';
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        if(sessionId != null) {
            headerParams.push({key : 'session-id', value : sessionId});
        }
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("PATCH", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     */
    async playersPut(sessionId : string, xApiKey : string) : Promise<void> {
        const __operationId__ = 'playersPut';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async playersRegisterOptions() : Promise<void> {
        const __operationId__ = 'playersRegisterOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players/register";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async playersStreamingPlatformAccountLinkingCodeOptions() : Promise<void> {
        const __operationId__ = 'playersStreamingPlatformAccountLinkingCodeOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players/streaming-platform-account-linking-code";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async prizesClaimOptions() : Promise<void> {
        const __operationId__ = 'prizesClaimOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/prizes/claim";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async prizesFulfillOptions() : Promise<void> {
        const __operationId__ = 'prizesFulfillOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/prizes/fulfill";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async prizesPrizeIdOptions() : Promise<void> {
        const __operationId__ = 'prizesPrizeIdOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/prizes/{prizeId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} xApiKey
     * @param {RegisterPlayerRequest} registerPlayerRequest
     */
    async registerPlayer(xApiKey : string, registerPlayerRequest : RegisterPlayerRequest) : Promise<RegisterPlayerResponse> {
        const __operationId__ = 'registerPlayer';
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'registerPlayerRequest' is not null or undefined
        if (registerPlayerRequest == null) {
            throw new Error(`Required parameter registerPlayerRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players/register";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, registerPlayerRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} matchId
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {SubmitScoreRequest} submitScoreRequest
     */
    async submitScore(matchId : string, sessionId : string, xApiKey : string, submitScoreRequest : SubmitScoreRequest) : Promise<void> {
        const __operationId__ = 'submitScore';
        // verify required parameter 'matchId' is not null or undefined
        if (matchId == null) {
            throw new Error(`Required parameter matchId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'submitScoreRequest' is not null or undefined
        if (submitScoreRequest == null) {
            throw new Error(`Required parameter submitScoreRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('matchId', matchId);


        let path : string = "/matches/{matchId}/score";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, submitScoreRequest, errorDefinitions);
    }
    /**
     *
     */
    async teamsTeamIdOptions() : Promise<void> {
        const __operationId__ = 'teamsTeamIdOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/teams/{teamId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async tournamentsOptions() : Promise<void> {
        const __operationId__ = 'tournamentsOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/tournaments";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async tournamentsTournamentIdEnterOptions() : Promise<void> {
        const __operationId__ = 'tournamentsTournamentIdEnterOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/tournaments/{tournamentId}/enter";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     */
    async tournamentsTournamentIdOptions() : Promise<void> {
        const __operationId__ = 'tournamentsTournamentIdOptions';

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/tournaments/{tournamentId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");

        return this.invoke("OPTIONS", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, null, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {string} tournamentId
     * @param {UpdatePlayerTournamentRequest} updatePlayerTournamentRequest
     */
    async updatePlayerTournament(sessionId : string, xApiKey : string, tournamentId : string, updatePlayerTournamentRequest : UpdatePlayerTournamentRequest) : Promise<UpdatePlayerTournamentResponse> {
        const __operationId__ = 'updatePlayerTournament';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'tournamentId' is not null or undefined
        if (tournamentId == null) {
            throw new Error(`Required parameter tournamentId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'updatePlayerTournamentRequest' is not null or undefined
        if (updatePlayerTournamentRequest == null) {
            throw new Error(`Required parameter updatePlayerTournamentRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('tournamentId', tournamentId);


        let path : string = "/player-tournaments/{tournamentId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, updatePlayerTournamentRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {string} tournamentId
     * @param {UpdatePlayerTournamentRequest} updatePlayerTournamentRequest
     */
    async updatePlayerTournament_0(sessionId : string, xApiKey : string, tournamentId : string, updatePlayerTournamentRequest : UpdatePlayerTournamentRequest) : Promise<UpdatePlayerTournamentResponse> {
        const __operationId__ = 'updatePlayerTournament_0';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'tournamentId' is not null or undefined
        if (tournamentId == null) {
            throw new Error(`Required parameter tournamentId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'updatePlayerTournamentRequest' is not null or undefined
        if (updatePlayerTournamentRequest == null) {
            throw new Error(`Required parameter updatePlayerTournamentRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();
        pathParams.set('tournamentId', tournamentId);


        let path : string = "/player-tournaments/{tournamentId}";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("PATCH", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, updatePlayerTournamentRequest, errorDefinitions);
    }
    /**
     *
     * @param {string} sessionId
     * @param {string} xApiKey
     * @param {UseStreamingPlatformAccountLinkingCodeRequest} useStreamingPlatformAccountLinkingCodeRequest
     */
    async useStreamingPlatformAccountLinkingCode(sessionId : string, xApiKey : string, useStreamingPlatformAccountLinkingCodeRequest : UseStreamingPlatformAccountLinkingCodeRequest) : Promise<void> {
        const __operationId__ = 'useStreamingPlatformAccountLinkingCode';
        // verify required parameter 'sessionId' is not null or undefined
        if (sessionId == null) {
            throw new Error(`Required parameter sessionId was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'xApiKey' is not null or undefined
        if (xApiKey == null) {
            throw new Error(`Required parameter xApiKey was null or undefined when calling ${__operationId__}.`);
        }
        // verify required parameter 'useStreamingPlatformAccountLinkingCodeRequest' is not null or undefined
        if (useStreamingPlatformAccountLinkingCodeRequest == null) {
            throw new Error(`Required parameter useStreamingPlatformAccountLinkingCodeRequest was null or undefined when calling ${__operationId__}.`);
        }

        const queryParams : Map<string, string> = new Map<string, string>();

        const headerParams : Array<{key : string, value : string}> = [];
        headerParams.push({key : 'Content-type', value : 'application/json'});
        headerParams.push({key : 'session-id', value : sessionId});
        headerParams.push({key : 'x-api-key', value : xApiKey});

        const pathParams : Map<string, string> = new Map<string, string>();


        let path : string = "/players/streaming-platform-account-linking-code";

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, "200 response");
        errorDefinitions.set(204, "204 response");
        errorDefinitions.set(400, "400 response");
        errorDefinitions.set(401, "401 response");
        errorDefinitions.set(403, "403 response");
        errorDefinitions.set(404, "404 response");
        errorDefinitions.set(406, "406 response");
        errorDefinitions.set(409, "409 response");

        return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
            pathParams, queryParams, headerParams, useStreamingPlatformAccountLinkingCodeRequest, errorDefinitions);
    }
}
