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
import { SimplePhraseProvider } from '../../src/player/phraseProvider';
import { PlayerNameGenerator } from '../../src/player/playerNameGenerator';

const testList1 = ['one', 'two', 'three'];
const provider1 = new SimplePhraseProvider(testList1);

const testList2 = ['four', 'five', 'siz'];
const provider2 = new SimplePhraseProvider(testList2);

describe('playerNameGenerator', () => {

    it('Rejects bad config.', () => {
        expect(() => new PlayerNameGenerator(
            {
                maxPhrases: 10,
                minPhrases: 1,
                phraseProviders: []
            }
        )).to.throw('cannot be empty', 'phraseProviders cannot be empty.');

        expect(() => new PlayerNameGenerator(
            {
                maxPhrases: 1,
                minPhrases: 3,
                phraseProviders: [new SimplePhraseProvider(['a'])]
            }
        )).to.throw('maxPhrases must be the same as minPhrases or higher', 'max must be greater than or equal to min.');

        expect(() => new PlayerNameGenerator(
            {
                maxPhrases: 1,
                minPhrases: 0,
                phraseProviders: [new SimplePhraseProvider(['a'])]
            }
        )).to.throw('must be 1 or higher.', 'min cannot be less than 1.');

        expect(() => new PlayerNameGenerator(
            {
                maxPhrases: 2,
                minPhrases: 1,
                phraseProviders: [new SimplePhraseProvider(['a'])]
            }
        )).to.throw('must have as many array elements', 'A phrase provider must be given for each phrase.');
    });

    it('Gets consistent phrase back for same ID.', () => {
        const generator = new PlayerNameGenerator({
            maxPhrases: 2,
            minPhrases: 1,
            phraseProviders: [provider1, provider2]
        });

        const id = Math.random() * 1000;

        const iterations = 100;
        const nameBase = generator.getFromId(id);

        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const name = generator.getFromId(id);
            if (name === nameBase) {
                matchCount++;
            }
        }
        expect(matchCount).to.equal(iterations,
             'We should get the same name for the same ID');
    });

    it('Gets random names back', () => {
        const generator = new PlayerNameGenerator({
            maxPhrases: 2,
            minPhrases: 1,
            phraseProviders: [provider1, provider1]
        });

        const iterations = 100;
        const nameBase = generator.getRandom();

        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const name = generator.getRandom();
            if (name === nameBase) {
                matchCount++;
            }
        }
        expect(matchCount).to.not.equal(iterations,
             'We should get different random names');
    });

    it('Always gets two words back.', () => {

        const ExpectedWordCount = 2;

        const generator = new PlayerNameGenerator({
            maxPhrases: ExpectedWordCount,
            minPhrases: ExpectedWordCount,
            phraseProviders: [provider1, provider1]
        });

        const iterations = 100;

        for (let i = 0; i < iterations; i++) {
            const name = generator.getRandom();
            const parts = name.split(' ');
            expect(parts.length).equal(ExpectedWordCount,
                'Should get same number of words back due to config with matchin min/max.');
        }
    });

    it('Gets random number of words back', () => {
        const generator = new PlayerNameGenerator({
            maxPhrases: 2,
            minPhrases: 1,
            phraseProviders: [provider1, provider1]
        });

        const iterations = 100;
        const nameBase = generator.getRandom();
        const partsBase = nameBase.split(' ');

        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const name = generator.getRandom();
            const parts = name.split(' ');

            if (parts.length === partsBase.length) {
                matchCount++;
            }
        }
        expect(matchCount).to.not.equal(iterations,
             'We should get different random number of words in the names');
    });

    it('Word formatter works', () => {
        const generator = new PlayerNameGenerator({
            maxPhrases: 2,
            minPhrases: 2,
            phraseProviders: [provider1, provider1],
            formatter: (word: string, count: number) => {
                return String(count);
            }
        });

        const iterations = 100;
        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const name = generator.getRandom();
            if (name === '0 1') {
                matchCount++;
            }
        }
        expect(matchCount).to.equal(iterations,
             'We should get all 0 1');
    });
});
