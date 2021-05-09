'use strict';

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 525,
    height: 840,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play ]
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// variables and settings
let VELOCITY = 500;
let MAX_X_VEL = 2000;   // pixels/second
let MAX_Y_VEL = 2000;
let JUMP_VELOCITY = -750;
let GRAVITY = 1500;

let keyLEFT, keyUP, keyDOWN, keyRIGHT, keyW, keyA, keyS, keyD, spacebar;
