// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
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
    scene: [ Menu, Play, Pause, Read ]
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// variables and settings
let VELOCITY = 500;
let MAX_X_VEL = 2000;   // pixels/second
let MAX_Y_VEL = 2000;
let DASH_VELOCITY = 2000;
let DIAG_DASH = Math.sqrt(Math.pow(DASH_VELOCITY, 2)/2);
let DASH_TIME = 100;
let DASH_LIMIT = 2;
let GRAVITY = 750;
let levelMap = ['LVL1', 'LVL2', 'LVL3', 'LVL4', 'LVL5'];
let levelNum = 0;

let keyW, keyA, keyS, keyD, spacebar, shift, esc, keyL;

let wCombo, sCombo, aCombo, dCombo, wdCombo, waCombo, sdCombo, saCombo, validCombo;

let player;
