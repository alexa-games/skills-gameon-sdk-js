#! /usr/bin/env node

/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

// Ensure required dependencies are installed before running script
const requiredPackages = ["convert-svg-to-png", "gridy-avatars"];
for (let dependency of requiredPackages) {
  try {
    require(dependency);
  } catch (e) {
    console.log(dependency + " not found, please install with: npm install " + dependency);
    return;
  }
}

const av = require('gridy-avatars');
const { convert } = require('convert-svg-to-png');
const fs = require('fs');
const { DEFAULT_NUMBER_OF_UNIQUE_AVATARS } = require('../lib/player/playerAvatarUriGeneratorConfig');

const AvatarDirectory = 'avatars';
const DefaultNumberToCreate = DEFAULT_NUMBER_OF_UNIQUE_AVATARS;
const AvatarDimension = 100;

(async () => {

    let numberToCreate = DefaultNumberToCreate;
    let directory = AvatarDirectory;

    if (process.argv.length > 3) {
        const value = process.argv[3];

        if (value === '--help') {
            console.log('This CLI tool will generate a 100x100 pixel image that can be used as a player avatar.');
            console.log(`By default, the tool will create ${DefaultNumberToCreate} images in the ${AvatarDirectory} directory.`);
            console.log('You may specify different values in the first two parameters of the script. For example: ');
            console.log('\n       avatar-maker -- 50 avatar1');
            console.log('\nWill create 50 images in the avatar1 directory.');
            process.exit(0);
        }

        numberToCreate = value;
    }

    if (process.argv.length > 4) {
        directory = process.argv[4];
    }

    console.log(`Generating ${numberToCreate} avatars in directory '${directory}'`);

    const fullPath = `${process.cwd()}/${directory}`;

    if (!fs.existsSync(fullPath)) {
        console.log('Creating avatars');
        fs.mkdirSync(fullPath);
    }

    for (let i = 0; i < numberToCreate; i++){
        let randomId = av.random();
        let outer = av.outer(randomId, AvatarDimension);
        const fileName = `${fullPath}/${i}.png`;
        try {
            if (fs.existsSync(fileName)) {
                console.log(`File already present ${fileName}`);
            } else {
                const png = await convert(outer);
                fs.writeFileSync(fileName, png);
                console.log(`Saving file ${fileName} from ${randomId}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    console.log(`\nDone!`);
})();
