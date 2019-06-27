
/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

export interface PhraseProvider {
    /**
     * Returns a word or phrase at random.
     * @return Random phrase
     */
    getRandomPhrase(): string;

    /**
     * Returns a constant word or phrase from the list.  This value is moduled with the
     * array size so any value can be safely used for the seed.
     * @param seed Value whose modulo is used to index the phrase/word list.
     * @return Deterministic phrase based on the seed.
     */
    getConstantPhrase(seed: number): string;
}

/**
 * Simple word provider that provides words selected from any array provided to the
 * class constructor.
 */
export class SimplePhraseProvider implements PhraseProvider {
    /**
     * Creates a new instance of SimplePhraseProvider
     * @param phrases Array of words or phrases that are returned by the provider.
     */
    constructor(
        private readonly phrases: string[]
    ) {
        if (!this.phrases || this.phrases.length === 0) {
            throw new Error('The parameter phrases cannot be empty.');
        }
    }

    public getRandomPhrase(): string {
        const randomValue = Math.floor((Math.random() * this.phrases.length));
        return this.getConstantPhrase(randomValue);
    }

    public getConstantPhrase(seed: number): string {
        return this.phrases[seed % this.phrases.length];
    }
}
