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
