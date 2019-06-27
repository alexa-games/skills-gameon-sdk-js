/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import { getHash } from './hashUtility';
import { DEFAULT_NUMBER_OF_UNIQUE_AVATARS, PlayerAvatarUriGeneratorConfig } from './playerAvatarUriGeneratorConfig';

/**
 * Returns a URL linking to an avatar. The avatar image must exist as a file at the provided avatarBaseUrl location
 * and consist of a number (no leading zeros) ending with .png.  For example, if there are 500 avatar images, the
 * first one will be 0.png and the last one will be 499.png.
 */
export class PlayerAvatarUriGenerator {
    /**
     * Creates a new instance of PlayerAvatarUriGenerator
     * @param config
     */
    constructor(private config: PlayerAvatarUriGeneratorConfig) {
        if (!config) {
            throw new Error('The parameter config cannot be empty.');
        }

        if (!config.avatarBaseUrl || config.avatarBaseUrl.length === 0) {
            throw new Error('The property avatarBaseUrl must be provided.');
        }

        this.config.numberOfUniqueAvatars = this.config.numberOfUniqueAvatars || DEFAULT_NUMBER_OF_UNIQUE_AVATARS;

        if (this.config.numberOfUniqueAvatars < 1) {
            throw new Error('The property numberOfUniqueAvatars cannot be less than one.');
        }
    }

    /**
     * Returns the URL of a randomly selected avatar.
     * @return Url of the avatar
     */
    public getRandom(): string {
        const index = Math.floor(Math.random() * this.config.numberOfUniqueAvatars!);

        return this.composeUrl(index);
    }

    /**
     * Selects a consistant avatar given an ID.
     * @param id Identity used to select a constant name.
     * @return Url of avatar
     */
    public getFromId(id: string | number): string {
        const hash = getHash(id);

        return this.getFromHash(hash);
    }

    /**
     * Selects a consistant avatar using the supplied hash buffer.
     * @param hash Buffer which should contain a 32 bit hash
     * of (such as SHA 256) of player's identity.
     * @return Url of avatar
     */
    public getFromHash(hash: Buffer): string {
        // Use the first int in the hash to decide which avatar to select.
        const index = (Math.abs(hash.readInt32BE(0)) % this.config.numberOfUniqueAvatars!);

        return this.composeUrl(index);
    }

    /**
     * Generates a URL based on the supplied index.
     * @param index Index indicating which image to use.
     */
    private composeUrl(index: number): string {
        if (index < 0 || index >= this.config.numberOfUniqueAvatars!) {
            throw new Error(`Parameter index is out of range. Must be 0 or larger but less than ${this.config.numberOfUniqueAvatars}`);
        }

        let separator = '';
        if (!this.config.avatarBaseUrl.endsWith('/')) {
            separator = '/';
        }

        return `${this.config.avatarBaseUrl}${separator}${index % this.config.numberOfUniqueAvatars!}.png`;
    }
}
