/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

import * as AWS from 'aws-sdk';
import * as https from 'https';

/**
 * Utility for decrypting GameOn API key
 */
export class KmsDecryptionHelper {
    /**
     * Retrieves previously decrypted payload, if cached. Otherwise, makes a call to KMS for decryption
     * @param encryptedFileUrl
     * @param kmsRegion
     * @param forceUpdate
     * @return Decrypted object containing GameOn API key
     */
    public static async getSecrets(encryptedFileUrl: string, kmsRegion: string, forceUpdate = false): Promise<any> {
        if (KmsDecryptionHelper.resolvedSecrets && !forceUpdate) {
            return KmsDecryptionHelper.resolvedSecrets;
        }
        const kms = new AWS.KMS({
            region: kmsRegion
        });
        const getEncryptedStream = async () => {
            return new Promise((resolve, reject) => {
                https.get(encryptedFileUrl,
                    (res) => {
                        const data: any[] = [];
                        res.on('data', (chunk: any) => {
                            // @ts-ignore
                            data.push(chunk);
                        });
                        res.on('end', () => {
                            try {
                                const returnBuffer = Buffer.concat(data);
                                resolve(returnBuffer);
                            } catch (e) {
                                console.error('Original Exception', e.message);
                            }
                        });
                    });
            });
        };

        return new Promise(async (resolve, reject) => {
            const stream = (await getEncryptedStream()) as Buffer;
            const params = {
                CiphertextBlob: stream
            };
            kms.decrypt(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // @ts-ignore
                    KmsDecryptionHelper.resolvedSecrets = JSON.parse(data.Plaintext.toString());
                    resolve(KmsDecryptionHelper.resolvedSecrets);
                }
            });
        });
    }
    private static resolvedSecrets: any;
}
