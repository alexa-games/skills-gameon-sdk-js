/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
