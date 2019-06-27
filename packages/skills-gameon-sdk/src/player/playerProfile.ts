
/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

export interface PlayerProfile  {
    /**
     * Display name for the player.
     */
    name: string;

    /**
     * URL referencing an avatar image assigned to the player.
     */
    avatar: string;

    /**
     * Hex color code
     */
    color: string;
}
