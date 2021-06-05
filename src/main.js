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
    scene: [ Menu, Play, Pause, Read, Hud ]
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
let levelMap = ['LVL1', 'LVL2', 'LVL3', 'LVL4', 'LVL5', 'LVL6', 'LVL7', 'LVL8'];
let levelNum = 0;
let newsIssue = ['newspaper2', 'newspaper3', 'newspaper4', 'newspaper6', 'newspaper5', 
'newspaper8', 'newspaper7f', 'newspaper', 'chooseClay', 'chooseClay2', 'chooseMud', 'chooseMud2'];
let newsTitle = ['Our Family: Clay People Utopia', 'Warning! The Tower of Mud People', 
'Clay Hates Mud Because Of Their Ugly Appearance', 'The Birth Of A New Language? Special Language Developed By Clay People Radicalism',
'Clay People Throw Rubbish Into The Tower', 'Clay Drove Mud Out Of The Ground', 'Attention! Schools Deprive Mud People of Their Right To Education',
'The Truth of ‘Gifts From The God’: An Unknown Experiment From Clay Group', 'Different Class Between Mud and Clay',
'Our Friend: The Hero of Mud Helps Clay Group', 'The Beginning of The War: Mud Betrays Clay',
'Clay People and Mud People are Friends'];
let maxHealth = 5;
let playerHealth = maxHealth;
let enemyLives = 2;

let keyW, keyA, keyS, keyD, keyE, spacebar, shift, esc, keyL;

let wCombo, sCombo, aCombo, dCombo, wdCombo, waCombo, sdCombo, saCombo, validCombo;

let player;
