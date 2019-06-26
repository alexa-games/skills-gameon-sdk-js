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

export * from './client/skillsGameOnApiClient';
export * from './utils/displayUtils';

export {PlayerNameGeneratorBuilder} from './player/playerNameGeneratorBuilder';
export {NameLists} from './player/nameLists';
export {PlayerNameGenerator} from './player/playerNameGenerator';
export {SimplePhraseProvider, PhraseProvider} from './player/phraseProvider';
export {PlayerNameGeneratorConfig} from './player/playerNameGeneratorConfig';
export {PlayerProfile} from './player/playerProfile';
export {PlayerProfileGenerator} from './player/playerProfileGenerator';
export {PlayerAvatarUriGenerator} from './player/playerAvatarUriGenerator';
export {DEFAULT_NUMBER_OF_UNIQUE_AVATARS, PlayerAvatarUriGeneratorConfig} from './player/playerAvatarUriGeneratorConfig';
export {PlayerProfileGeneratorBuilder} from './player/playerProfileGeneratorBuilder';
export {KmsDecryptionHelper} from './utils/kmsDecryptionHelper';

export * from '@alexa-games/gameon-sdk';
