
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

import { getHash} from './hashUtility';
import { PlayerNameGeneratorConfig } from './playerNameGeneratorConfig';

/**
 * Generates a name based on the provided configuration.  The configuration includes the
 * minimum and maximum number of phrases that compose the name as well as an array of phrase
 * providers. A different phrase provider can be used for each ordinal phrase allowing
 * different lists for the first phrase, second phrase, etc.   A phrase may be only one
 * word long.
 */
export class PlayerNameGenerator {

    private static verifyConfig(config: PlayerNameGeneratorConfig) {
        if (!config) {
            throw new Error('The parameter config cannot be empty.');
        }

        if (config.minPhrases < 1) {
            throw new Error('The property minPhrases must be 1 or higher.');
        }

        if (config.maxPhrases < config.minPhrases) {
            throw new Error('The property maxPhrases must be the same as minPhrases or higher.');
        }

        if (!config.phraseProviders || config.phraseProviders.length === 0) {
            throw new Error('The property phraseProviders cannot be empty.');
        }

        if (config.phraseProviders.length < config.maxPhrases) {
            throw new Error('The property phraseProviders must have as many array elements as the value for maxPhrases.');
        }
    }

    constructor(private readonly config: PlayerNameGeneratorConfig) {
        PlayerNameGenerator.verifyConfig(this.config);

        // If no formatter is specified, just return the input phrase unmodified.
        this.config.formatter = this.config.formatter || ((phrase) => phrase);
    }

    /**
     * Creates a random name.
     */
    public getRandom(): string {

        const MaxPhraseIndex = 65535;

        const phrasesRequired = this.getNumberOfPhrasesInName();

        const indexList: number[] = [];

        for (let phraseCount = 0; phraseCount < phrasesRequired; phraseCount++) {
            indexList.push(this.getRandomInt(0, MaxPhraseIndex));
        }

        return this.createName(indexList);
    }

    /**
     * Generates a consistant name given an ID. This method works by taking a hash of the
     * provided ID and call the getFromHash() method.
     * @param id Identity to generate a constant name from.
     */
    public getFromId(id: string | number) {
        const hash = getHash(String(id));

        return this.getFromHash(hash);
    }

    /**
     * Create a player name using the supplied hash buffer.
     * @param hash Generates a name from the supplied buffer which should contain a 32 byte hash
     * of (such as SHA 256) of player's identity.
     */
    public getFromHash(hash: Buffer) {
        const BytesPerPhrase = 4;
        const maxPhrasesForHash = hash.length / BytesPerPhrase;

        // The hash returns 32 bytes which will support an 8 phrase name. This should be
        // plenty, but we verify and throw a helpful error message anyway.
        if (maxPhrasesForHash < this.config.maxPhrases) {
            throw new Error(`The value for maxPhrases (${this.config.maxPhrases}) ` +
                `is too large for this method which supports ${maxPhrasesForHash} phrases.`);
        }

        // Use the first int in the hash to decide how many phrases will be in the
        // name for this ID.
        const phrasesRequired = (Math.abs(hash.readInt32BE(0)) % (this.config.maxPhrases - this.config.minPhrases + 1) + this.config.minPhrases);
        const indexList: number[] = [];

        for (let phraseCount = 0; phraseCount < phrasesRequired; phraseCount++) {
            const phraseIndex = hash.readInt32BE(phraseCount * BytesPerPhrase);
            indexList.push(Math.abs(phraseIndex));
        }

        return this.createName(indexList);
    }

    private createName(indexList: number[]): string {
        let name = '';

        for (let phraseCount = 0; phraseCount < indexList.length; phraseCount++) {
            const phrase = this.config.phraseProviders[phraseCount].getConstantPhrase(indexList[phraseCount]);
            if (phraseCount > 0) {
                name += ' ';
            }

            name += this.config.formatter!(phrase, phraseCount);
        }

        return name;
    }

    private getNumberOfPhrasesInName() {
        return this.getRandomInt(this.config.minPhrases, this.config.maxPhrases);
    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
