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
    scene: [ Menu, Play, Pause, Read, Hud , NewspaperAccess]
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// variables and settings
let VELOCITY = 400;
let MAX_X_VEL = 2000;   // pixels/second
let MAX_Y_VEL = 2000;
let DASH_VELOCITY = 1000;
let DIAG_DASH = Math.sqrt(Math.pow(DASH_VELOCITY, 2)/2);
let DASH_TIME = 150;
let DASH_LIMIT = 2;
let GRAVITY = 750;
let levelMap = ['LVL1', 'LVL2', 'LVL3', 'LVL4', 'LVL5', 'LVL6', 'LVL7', 'LVL8', 'LVL9'];
let levelNum = 0;
let newsIssue = ['newspaper2', 'newspaper3', 'newspaper4', 'newspaper6', 'newspaper5', 
'newspaper8', 'newspaper7', 'newspaper', 'chooseClay', 'chooseClay2', 'chooseMud', 'chooseMud2'];
let newsAccess = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let maxHealth = 5;
let playerHealth = maxHealth;
let enemyLives = 2;
let elderMsg = [
    'We\'ve been expecting you, bright one.', 
    'Do what you must. I only ask that you read the papers.', 
    'Hmph. You\'re slower than I thought.', 
    'I spearheaded this project when it began.',
    'Over 42 years, many have moved in here to work.', 
    'Nice tights, by the way.', 
    'We may be at a disadvantage, but we have strong resolve.',
    'Of course, we have little chance at stopping you.', 
    'Now, you must choose. Destroy the last foundation, you die beneath. Help us rebuild what you\'ve ruined, and this will be forgiven.'
];

let keyW, keyA, keyS, keyD, keyE, spacebar, shift, esc, keyL;

let wCombo, sCombo, aCombo, dCombo, wdCombo, waCombo, sdCombo, saCombo, validCombo;

let player;
