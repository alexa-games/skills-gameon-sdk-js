/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
