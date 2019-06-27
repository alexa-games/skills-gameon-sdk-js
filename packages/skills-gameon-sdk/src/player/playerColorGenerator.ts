
/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import uuidv4 from 'uuid/v4';
import { getHash} from './hashUtility';
import { PlayerNameGeneratorConfig } from './playerNameGeneratorConfig';

export class PlayerColorGenerator {
    private readonly HEX_COLOR_LENGTH = 6;
    /**
     * Generates a random color.
     */
    public getRandom(): string {
        const uuid = uuidv4();
        return this.getFromHash(getHash(uuid));
    }

    /**
     * Generates a deterministic color given an Id.
     * @param id Identity to generate a constant name from.
     */
    public getFromId(id: string | number) {
        const hash = getHash(String(id));
        return this.getFromHash(hash);
    }

    /**
     * Create a player color using the supplied hash buffer.
     * @param hash Generates a name from the supplied buffer which should contain a 32 byte hash
     * of (such as SHA 256) of player's identity.
     */
    public getFromHash(hash: Buffer) {
        const hexId = hash.toString('hex');
        // Retrieve the first 6 characters of hex string
        return hexId.substr(hexId.length - this.HEX_COLOR_LENGTH);
    }
}
