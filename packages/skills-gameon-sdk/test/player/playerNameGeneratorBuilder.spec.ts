/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
