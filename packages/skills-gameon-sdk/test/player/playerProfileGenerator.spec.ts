
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
import { PlayerProfileGeneratorBuilder } from '../../src/player/playerProfileGeneratorBuilder';

describe('displayPlayerGeneratorBuilder', () => {

    it('Get a display player generator builder.', () => {
        const generator = PlayerProfileGeneratorBuilder.getGenerator({
            avatarBaseUrl: 'https://example.com/avatars',
            numberOfUniqueAvatars: 1000
        });

        const player = generator.getPlayerProfileFromId(5);

        // tslint:disable-next-line:no-unused-expression
        expect(player.name).is.not.empty;
        // tslint:disable-next-line:no-unused-expression
        expect(player.avatar).is.not.empty;
    });

    it('Get a display player generator builder in English for fr-FR.', () => {
        const generatorEnUs = PlayerProfileGeneratorBuilder.getGenerator({
            avatarBaseUrl: 'https://example.com/avatars',
            numberOfUniqueAvatars: 1000,
            locale: 'en-US'
        });

        const playerId = 5;

        const playerEnUs = generatorEnUs.getPlayerProfileFromId(playerId);

        const generatorFrFr = PlayerProfileGeneratorBuilder.getGenerator({
            avatarBaseUrl: 'https://example.com/avatars',
            numberOfUniqueAvatars: 1000,
            locale: 'fr-FR'
        });

        const playerFrFr = generatorFrFr.getPlayerProfileFromId(playerId);

        expect(playerEnUs.name).equals(playerFrFr.name, 'French defaults to English and gets same name.');
    });

    it('Get an exception for bad locale.', () => {
        expect(() => { return PlayerProfileGeneratorBuilder.getGenerator({
            avatarBaseUrl: 'https://example.com/avatars',
            numberOfUniqueAvatars: 1000,
            locale: 'XX-UNITTEST'
        }); }).to.throw('Unsupported locale', 'Expected this special test locale to throw.');
    });

    it('Gets random display data back', () => {
        const generator = PlayerProfileGeneratorBuilder.getGenerator({
            avatarBaseUrl: 'https://example.com/avatars',
            numberOfUniqueAvatars: 1000
        });

        const iterations = 100;
        const playerBase = generator.getRandomPlayerProfile();

        let matchNameCount = 0;
        let matchAvatarCount = 0;

        for (let i = 0; i < iterations; i++) {
            const player = generator.getRandomPlayerProfile();

            if (player.name === playerBase.name) {
                matchNameCount++;
            }

            if (player.avatar === playerBase.avatar) {
                matchAvatarCount++;
            }
        }

        expect(matchNameCount).to.not.equal(iterations,
            'We should get different names');
        expect(matchAvatarCount).to.not.equal(iterations,
            'We should get different avatars');
    });
});
