/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import { NameLists } from './nameLists';
import { SimplePhraseProvider } from './phraseProvider';
import { PlayerNameGenerator } from './playerNameGenerator';

import randomWords = require('random-words');

/**
 * Builder for PlayerNameGenerator. Because there are many ways a PlayerNameGenerator can
 * be configured, this builder provides two basic configurations. One provides a name with
 * three to four words using the supplied NameLists grouping of words. The other provides a
 * two word name using the word list from the random-words package.  See each builder
 * method for more details.
 */
export class PlayerNameGeneratorBuilder {

    /**
     * Returns three words from three built in lists of words.
     * @param locale Create the name generator based on the provided locale.
     *      Unknown locales will default to en-US. Currently, only en-US is
     *      implemented.
     */
    public static getGenerator(locale?: string): PlayerNameGenerator {

        locale = locale || 'en-US';

        switch (locale) {
            // Special unsupported case for unit test support.
            case 'XX-UNITTEST':
                throw new Error(`Unsupported locale ${locale}`);
            case 'en-US':
            default:
                return new PlayerNameGenerator({
                    minPhrases: 3,
                    maxPhrases: 3,
                    phraseProviders: [
                        new SimplePhraseProvider(NameLists.first),
                        new SimplePhraseProvider(NameLists.second),
                        new SimplePhraseProvider(NameLists.third)
                    ]
                });
        }
    }

    /**
     * Returns two words from the random-words NPM package.
     */
    public static getGeneratorRandomWords(): PlayerNameGenerator {
        return new PlayerNameGenerator({
            minPhrases: 2,
            maxPhrases: 2,
            phraseProviders: [
                new SimplePhraseProvider(randomWords.wordList),
                new SimplePhraseProvider(randomWords.wordList)
            ],
            formatter: (word: string, count: number) => {
                // Ensure each word starts with a capital letter.
                if (word.length > 1) {
                    word = word.charAt(0).toUpperCase() + word.slice(1);
                }
                return word;
            }
        });
    }
}
