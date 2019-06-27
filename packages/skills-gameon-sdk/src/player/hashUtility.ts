/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import crypto from 'crypto';

/**
 * Generate hash from id
 * @param id Used to generate hash
 * @return Buffer
 */
export function getHash(id: string | number): Buffer {
    if (typeof (id) !== 'number' && (!id || id.length === 0)) {
        throw new Error('Parameter id cannot be empty.');
    }

    const hash = crypto.createHash('sha256');
    hash.update(String(id));
    return hash.digest();
}
