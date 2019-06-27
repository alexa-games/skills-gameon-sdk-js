/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import { PhraseProvider } from './phraseProvider';

export interface PlayerNameGeneratorConfig {
    /**
     * Shortest name to return.  This value must be at least 1.
     */
    minPhrases: number;

    /**
     * Longest name to return. This value cannot be smaller than mixPhrases.
     */
    maxPhrases: number;

    /**
     * Array of phrase providers. The number of providers must match maxPhrases.
     * The provider position in the array coresponds to the phrase position returned.
     * The same provider instance may be used in each array position if the same
     * provider should be used for each possible phrase.
     */
    phraseProviders: PhraseProvider[];

    /**
     * Optional formatter that gives the caller the ability to modify the word or phrase before
     * it is contatinated to the name.
     */
    formatter?: (phrase: string, wordIndex: number) => string;
}
