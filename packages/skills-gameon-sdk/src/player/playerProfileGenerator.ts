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

import { getHash } from './hashUtility';
import { PlayerAvatarUriGenerator } from './playerAvatarUriGenerator';
import { PlayerColorGenerator } from './playerColorGenerator';
import { PlayerNameGenerator } from './playerNameGenerator';
import { PlayerProfile } from './playerProfile';
import { PlayerProfileGeneratorConfig } from './playerProfileConfig';

/**
 * Generates an object with a name and avatar property by using the configured
 * Player Name Generator and Player Avatar URI generator.
 */
export class PlayerProfileGenerator {

    private readonly nameGenerator: PlayerNameGenerator;
    private readonly avatarSelector: PlayerAvatarUriGenerator;
    private readonly colorGenerator: PlayerColorGenerator;

    constructor(config: PlayerProfileGeneratorConfig) {
        this.nameGenerator = config.playerNameGeneratorBuilder();
        this.avatarSelector = config.playerAvatarUriGeneratorBuilder();
        this.colorGenerator = new PlayerColorGenerator();
    }

    /**
     * Generates a profile with the same name, avatar URI, and color for a given ID.
     * @param id ID of the player for whom to generate a profile.
     */
    public getPlayerProfileFromId(id: number | string): PlayerProfile {
        const hash = getHash(id);

        return {
            name: this.nameGenerator.getFromHash(hash),
            avatar: this.avatarSelector.getFromHash(hash),
            color: this.colorGenerator.getFromHash(hash)
        };
    }

    /**
     * Generates a randomly selected name, avatar URI, and color.
     */
    public getRandomPlayerProfile(): PlayerProfile {
        return {
            name: this.nameGenerator.getRandom(),
            avatar: this.avatarSelector.getRandom(),
            color: this.colorGenerator.getRandom()
        };
    }
}
