/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
