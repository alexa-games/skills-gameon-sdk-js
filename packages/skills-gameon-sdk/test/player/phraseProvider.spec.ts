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

describe('phraseProvider', () => {

    it('Disallows empty list.', () => {
        expect(() => new SimplePhraseProvider([])).to.throw('cannot be empty');
    });

    it('Gets consistent word back for same input.', () => {
        const provider = new SimplePhraseProvider(['a', 'b', 'c']);

        const iterations = 100;
        const seed = 10;
        const phraseBase = provider.getConstantPhrase(seed);

        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const phrase = provider.getConstantPhrase(seed);
            if (phrase === phraseBase) {
                matchCount++;
            }
        }
        expect(matchCount).to.equal(iterations,
             'We should get the same phrase for the same seed');
    });

    it('Gets random words back', () => {
        const provider = new SimplePhraseProvider(['a', 'b', 'c']);

        const iterations = 100;
        const phraseBase = provider.getRandomPhrase();

        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const phrase = provider.getRandomPhrase();
            if (phrase === phraseBase) {
                matchCount++;
            }
        }
        expect(matchCount).to.not.equal(iterations,
            'We should not get the same phrase for random calls.');
    });
});
