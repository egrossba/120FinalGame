class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.image('talltrees', 'talltrees.png');
        this.load.image('agent', 'MC1.png');
        this.load.image('agent2', 'MC2.png');
        this.load.image('mudthrower1', 'mudthrower1.png');
        this.load.image('mudthrower2', 'mudthrower2.png');
        this.load.image('mudthrower3', 'mudthrower3.png');
        this.load.image('clayball', 'clayball.png');
        this.load.image('bunny', 'bunny.png');
        this.load.image('title', 'DownbringerTitle.png');
        this.load.image('button', 'MainMenu-02.png');
        this.load.image('start', 'StartText.png');
        this.load.image('tutorial', 'TutorialText.png');
        this.load.image('credits', 'CreditsText.png');

        this.load.audio('dash', 'shortdash.wav');
        this.load.audio('shield', 'shield2.wav');
        this.load.audio('destroy', 'destroy3.wav');
        this.load.audio('landing', 'landing.wav');
        this.load.audio('running', 'running.wav');
        this.load.audio('throw', 'throw.wav');
        this.load.audio('bounce', 'mudbounce.wav');

        this.load.aseprite('MC-idle', 'MC-idle.png', 'MC-idle.json');
        this.load.aseprite('mudthrower-throw', 'mudthrower-throw.png', 'mudthrower-throw.json');
        this.load.aseprite('breakable', 'breakableplatform.png', 'breakableplatform.json');
    
        this.load.image("tilesheet", "tilemap.png");    // tile sheet
        this.load.tilemapTiledJSON("LVL1", "lvl1 48.json");    // Tiled JSON file
        this.load.tilemapTiledJSON("LVL2", "LVL2 48.json");
        this.load.tilemapTiledJSON("LVL3", "lvl3 48.json");
        this.load.tilemapTiledJSON("LVL4", "lvl4 48.json");
        this.load.tilemapTiledJSON("LVL5", "lvl5 48.json");
    }

    create() {
        levelNum = 0;

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }

        this.bg = this.add.sprite(game.config.width/2, game.config.height/2, 'title').setOrigin(.5).setScale(.9);
        
        // Buttons
        // start
        this.startBut = this.add.sprite(game.config.width/2, game.config.height*3/7, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.startBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.startBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            this.scene.start('playScene');
        });
        this.startText = this.add.sprite(game.config.width/2, game.config.height*3/7, 'start').setOrigin(.5).setScale(.25)
        // tutorial
        this.tutorialBut = this.add.sprite(game.config.width/2, game.config.height*4/7, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.tutorialBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.tutorialBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {

        });
        this.tutText = this.add.sprite(game.config.width/2, game.config.height*4/7, 'tutorial').setOrigin(.5).setScale(.25)
        // credits
        this.credsBut = this.add.sprite(game.config.width/2, game.config.height*5/7, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.credsBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.credsBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {

        });
        this.credsText = this.add.sprite(game.config.width/2, game.config.height*5/7, 'credits').setOrigin(.5).setScale(.25)


    }
}