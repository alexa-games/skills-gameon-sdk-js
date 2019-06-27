
/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
