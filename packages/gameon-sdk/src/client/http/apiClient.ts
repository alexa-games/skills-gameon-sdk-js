/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

/**
 * Represents the interface between ApiClient and a Service Client.
 * @export
 * @interface ApiClientMessage
 */
export interface ApiClientMessage {
    headers: Array<{key: string, value: string}>;
    body?: string;
}

/**
 * Represents a request sent from Service Clients to an ApiClient implementation.
 * @export
 * @interface ApiClientRequest
 * @extends {ApiClientMessage}
 */
export interface ApiClientRequest extends ApiClientMessage {
    url: string;
    method: string;
}

/**
 * Represents a response returned by ApiClient implementation to a Service Client.
 * @export
 * @interface ApiClientResponse
 * @extends {ApiClientMessage}
 */
export interface ApiClientResponse extends ApiClientMessage {
    /**
     * Result code of the attempt to satisfy the request. Normally this
     * corresponds to the HTTP status code returned by the server.
     */
    statusCode: number;
}

/**
 * Represents a basic contract for API request execution
 * @export
 * @interface ApiClient
 */
export interface ApiClient {
    /**
     * Dispatches a request to an API endpoint described in the request.
     * An ApiClient is expected to resolve the Promise in the case an API returns a non-200 HTTP
     * status code. The responsibility of translating a particular response code to an error lies with the
     * caller to invoke.
     * @param {ApiClientRequest} request request to dispatch to the ApiClient
     * @returns {Promise<ApiClientResponse>} Response from the ApiClient
     * @memberof ApiClient
     */
    invoke(request: ApiClientRequest): Promise<ApiClientResponse>;
}

/**
 * Represents an interface that provides API configuration options needed by service clients.
 * @interface ApiConfiguration
 */
export interface ApiConfiguration {
    /**
     * Configured ApiClient implementation
     */
    apiClient: ApiClient;
    /**
     * Endpoint to hit by the service client instance
     */
    apiEndpoint: string;
}
