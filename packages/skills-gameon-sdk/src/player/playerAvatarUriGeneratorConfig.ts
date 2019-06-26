
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

export interface PlayerAvatarUriGeneratorConfig {
    /**
     * URL where the avatar images are hosted.  This URL contains the path
     * up to, but not including, the image file name.
     */
    avatarBaseUrl: string;

    /**
     * Number of avatar images available at the supplied URL. If a value is not provided the
     * default value in DEFAULT_NUMBER_OF_UNIQUE_AVATARS is used.
     */
    numberOfUniqueAvatars?: number;
}

/**
 * Default number of avatar images.
 */
export const DEFAULT_NUMBER_OF_UNIQUE_AVATARS = 500;
