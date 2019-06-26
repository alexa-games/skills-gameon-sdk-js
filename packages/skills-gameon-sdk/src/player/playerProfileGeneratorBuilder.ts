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

import { PlayerAvatarUriGenerator } from './playerAvatarUriGenerator';
import { PlayerAvatarUriGeneratorConfig } from './playerAvatarUriGeneratorConfig';
import { PlayerNameGeneratorBuilder } from './playerNameGeneratorBuilder';
import { PlayerProfileGenerator } from './playerProfileGenerator';

export interface PlayerProfileGeneratorBuilderParams extends PlayerAvatarUriGeneratorConfig {
    /**
     * Locale to use when generating the player's name. This allows for the possibility of selecting
     * words appropriate to the player's locale when selecting a random name.
     */
    locale?: string;
}

export class PlayerProfileGeneratorBuilder {

    /**
     * Returns a generator for Display properties of a player.
     *
     * @param config Configuration specific to the environment
     */
    public static getGenerator(config: PlayerProfileGeneratorBuilderParams): PlayerProfileGenerator {
        return new PlayerProfileGenerator({
            playerAvatarUriGeneratorBuilder: () => {
                return new PlayerAvatarUriGenerator(config);
            },
            playerNameGeneratorBuilder: () => {
                return PlayerNameGeneratorBuilder.getGenerator(config.locale);
            }
        });
    }
}
