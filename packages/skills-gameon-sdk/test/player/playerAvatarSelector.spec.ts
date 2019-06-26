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

// tslint:disable:no-magic-numbers

import { expect } from 'chai';
import { PlayerAvatarUriGenerator } from '../../src/player/playerAvatarUriGenerator';

describe('playerAvatarSelector', () => {

    it('Rejects bad config.', () => {
        expect(() => new PlayerAvatarUriGenerator(
            {
                numberOfUniqueAvatars: -10,
                avatarBaseUrl: 'https://example.com/avatars/'
            }
        )).to.throw('cannot be less than one', 'numberOfUniqueAvatars cannot be less than one.');

        expect(() => new PlayerAvatarUriGenerator(
            {
                avatarBaseUrl: ''
            }
        )).to.throw('The property avatarBaseUrl', 'avatarBaseUrl must be provided.');
    });

    it('Gets consistent URL back for same ID.', () => {
        const selector = new PlayerAvatarUriGenerator({
            avatarBaseUrl: 'https://example.com'
        });

        const id = Math.random() * 1000;

        const iterations = 100;
        const urlBase = selector.getFromId(id);

        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const url = selector.getFromId(id);
            if (url === urlBase) {
                matchCount++;
            }
        }
        expect(matchCount).to.equal(iterations,
             'We should get the same URL for the same ID');
    });

    it('Gets random URls back', () => {
        const selector = new PlayerAvatarUriGenerator({
            avatarBaseUrl: 'https://example.com'
        });

        const iterations = 100;
        const urlBase = selector.getRandom();

        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const url = selector.getRandom();
            if (url === urlBase) {
                matchCount++;
            }
        }
        expect(matchCount).to.not.equal(iterations,
             'We should get different random URLs');
    });
});
