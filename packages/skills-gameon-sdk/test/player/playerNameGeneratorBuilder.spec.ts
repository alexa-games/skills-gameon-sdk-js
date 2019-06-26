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
import { PlayerNameGeneratorBuilder } from '../../src/player/playerNameGeneratorBuilder';

describe('playerNameGeneratorBuilder', () => {

    it('Get basic three word generator.', () => {
        const generator = PlayerNameGeneratorBuilder.getGenerator('en-US');

        const ExpectedMinWordCount = 3;
        const ExpectedMaxWordCount = 4;

        const iterations = 100;

        for (let i = 0; i < iterations; i++) {
            const name = generator.getRandom();
            const parts = name.split(' ');
            expect(parts.length).not.lessThan(ExpectedMinWordCount,
                `Should get at least ${ExpectedMinWordCount} words back. name=${name}`);
            expect(parts.length).not.greaterThan(ExpectedMaxWordCount,
                `Should get no more than ${ExpectedMaxWordCount} words back. name=${name}`);
        }
    });

    it('Get random two word generator.', () => {
        const generator = PlayerNameGeneratorBuilder.getGeneratorRandomWords();

        const ExpectedWordCount = 2;

        const iterations = 100;

        for (let i = 0; i < iterations; i++) {
            const name = generator.getRandom();
            const parts = name.split(' ');
            expect(parts.length).equal(ExpectedWordCount,
                'Should get two words back.');

            for (const word of parts) {
                expect(word.substr(0, 1)).equals(word.substr(0, 1).toUpperCase(),
                    'All words should have an initial upper case letter.');
            }
        }
    });
});
