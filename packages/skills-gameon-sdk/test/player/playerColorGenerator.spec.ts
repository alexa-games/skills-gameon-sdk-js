/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

// tslint:disable:no-magic-numbers
// tslint:disable:no-unused-expression

import { expect } from 'chai';
import { getHash } from '../../src/player/hashUtility';
import { PlayerColorGenerator } from '../../src/player/playerColorGenerator';

describe('playerColorGenerator', () => {
    it('Gets a valid color back', () => {
        const generator = new PlayerColorGenerator();
        const color = generator.getFromHash(getHash('test-1'));
        expect(/^[0-9A-F]{6}$/i.test(color)).to.be.true; // regex for valid hex color
    });

    it('Gets consistent color back for same ID.', () => {
        const generator = new PlayerColorGenerator();
        const id = Math.random() * 1000;
        const iterations = 100;
        const colorBase = generator.getFromId(id);
        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const color = generator.getFromId(id);
            expect(/^[0-9A-F]{6}$/i.test(color)).to.be.true; // regex for valid hex color
            if (color === colorBase) {
                matchCount++;
            }
        }
        expect(matchCount).to.equal(iterations,
            'We should get the same color for the same ID');
    });

    it('Gets random colors back', () => {
        const generator = new PlayerColorGenerator();

        const iterations = 100;
        const colorBase = generator.getRandom();

        let matchCount = 0;

        for (let i = 0; i < iterations; i++) {
            const color = generator.getRandom();
            expect(/^[0-9A-F]{6}$/i.test(color)).to.be.true; // regex for valid hex color
            if (color === colorBase) {
                matchCount++;
            }
        }
        expect(matchCount).to.not.equal(iterations,
            'We should get different random colors');
    });
});
