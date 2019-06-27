/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import { PlayerAvatarUriGenerator } from './playerAvatarUriGenerator';
import { PlayerNameGenerator } from './playerNameGenerator';

export interface PlayerProfileGeneratorConfig {

    /**
     * A function that returns an instance of a PlayerNameGenerator
     */
    playerNameGeneratorBuilder: () => PlayerNameGenerator;

    /**
     * A function that returns an instance of a PlayerAvatarSelector
     */
    playerAvatarUriGeneratorBuilder: () => PlayerAvatarUriGenerator;

}
