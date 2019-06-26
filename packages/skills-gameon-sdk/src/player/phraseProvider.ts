
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
