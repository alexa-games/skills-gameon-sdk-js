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

// tslint:disable:no-magic-numbers

import { expect } from 'chai';
import nock from 'nock';
import { ApiClient, ApiClientRequest, ApiClientResponse } from '../../../src/client/http/apiClient';
import { DefaultApiClient } from '../../../src/client/http/defaultApiClient';

describe('defaultApiClient', () => {
    const testHttpUrl: string  = 'http://dummy.com';
    const testHttpsUrl: string  = 'https://dummy.com';
    let apiClient: ApiClient;

    before(() => {
        apiClient = new DefaultApiClient();
    });

    it('should be able to send POST request', async () => {
        const request: ApiClientRequest = {
            body : 'Test POST Message',
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'}
            ],
            method : 'POST',
            url : testHttpUrl
        };

        const apiFake = nock(testHttpUrl)
            .matchHeader('k1', 'v1,k2')
            .post('/', 'Test POST Message')
            .reply(200, 'Success', {
                v1 : ['k_1', 'k_2']
            });

        const response: ApiClientResponse = await apiClient.invoke(request);

        expect(apiFake.isDone()).equal(true);
        expect(response.statusCode).equal(200);
        expect(response.body).equal('Success');
        expect(response.headers[0]).deep.equal({key : 'v1', value : 'k_1'});
        expect(response.headers[1]).deep.equal({key : 'v1', value : 'k_2'});
    });

    it('should be able to send GET request', async () => {
        const request: ApiClientRequest = {
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'}
            ],
            method : 'GET',
            url : testHttpUrl
        };

        const apiFake = nock(testHttpUrl)
            .matchHeader('k1', 'v1,k2')
            .get('/')
            .reply(200, 'Success', {
                v1 : ['k_1', 'k_2']
            });

        const response: ApiClientResponse = await apiClient.invoke(request);

        expect(apiFake.isDone()).equal(true);
        expect(response.statusCode).equal(200);
        expect(response.body).equal('Success');
        expect(response.headers[0]).deep.equal({key : 'v1', value : 'k_1'});
        expect(response.headers[1]).deep.equal({key : 'v1', value : 'k_2'});
    });

    it('should be able to send DELETE request', async () => {
        const request: ApiClientRequest = {
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'}
            ],
            method : 'DELETE',
            url : testHttpsUrl
        };

        const apiFake = nock(testHttpsUrl)
            .matchHeader('k1', 'v1,k2')
            .delete('/')
            .reply(200, 'Success', {
                v1 : ['k_1', 'k_2']
            });

        const response: ApiClientResponse = await apiClient.invoke(request);

        expect(apiFake.isDone()).equal(true);
        expect(response.statusCode).equal(200);
        expect(response.body).equal('Success');
        expect(response.headers[0]).deep.equal({key : 'v1', value : 'k_1'});
        expect(response.headers[1]).deep.equal({key : 'v1', value : 'k_2'});
    });

    it('should be able to send PUT request', async () => {
        const request: ApiClientRequest = {
            body : 'Test PUT Message',
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'}
            ],
            method : 'PUT',
            url : testHttpsUrl
        };

        const apiFake = nock(testHttpsUrl)
            .matchHeader('k1', 'v1,k2')
            .put('/', 'Test PUT Message')
            .reply(200, 'Success', {
                v1 : 'k_1'
            });

        const response: ApiClientResponse = await apiClient.invoke(request);

        expect(apiFake.isDone()).equal(true);
        expect(response.statusCode).equal(200);
        expect(response.body).equal('Success');
        expect(response.headers[0]).deep.equal({key : 'v1', value : 'k_1'});
    });

    it('should throw an error if API has returned an error', async () => {
        const request: ApiClientRequest = {
            body : 'Test PUT Message',
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'}
            ],
            method : 'PUT',
            url : testHttpsUrl
        };

        const apiFake = nock(testHttpsUrl)
            .matchHeader('k1', 'v1,k2')
            .put('/', 'Test PUT Message')
            .replyWithError('UnknownError');

        try {
            await apiClient.invoke(request);
        } catch (err) {
            expect(apiFake.isDone()).equal(true);
            expect(err.name).equal('Error');
            expect(err.message).equal('UnknownError');

            return;
        }

        throw new Error('should have thrown an error!');
    });
});
