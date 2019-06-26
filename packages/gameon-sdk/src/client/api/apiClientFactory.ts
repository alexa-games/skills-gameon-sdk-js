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

import { ApiConfiguration } from '../http/apiClient';

/**
 * Helper class that instantiates an ApiClient implementation automatically resolving its
 * required ApiConfiguration.
 * @export
 * @class ApiClientFactory
 */
import { GameOnApiClient } from './gameOnApiClient';

export class ApiClientFactory {
    public apiConfiguration: ApiConfiguration;

    constructor(apiConfiguration: ApiConfiguration) {
        this.apiConfiguration = apiConfiguration;
    }

    /**
     * Gets an instance of GameOnApiClient.
     */
    public getGameOnApiClient(): GameOnApiClient {
        try {
            return new GameOnApiClient(this.apiConfiguration);
        } catch (e) {
            const factoryError = new Error(`ApiClientFactory Error while initializing GameOnApiClient: ${e.message}`);
            factoryError['name'] = 'ApiClientFactoryError';

            throw factoryError;
        }
    }
}
