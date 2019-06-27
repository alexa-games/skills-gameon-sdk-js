/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
