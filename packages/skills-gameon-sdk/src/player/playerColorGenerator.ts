
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
