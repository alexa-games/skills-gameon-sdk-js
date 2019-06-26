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
