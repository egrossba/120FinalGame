class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
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

        this.load.audio('dash', 'shortdash.wav');
        this.load.audio('shield', 'shield2.wav');
        this.load.audio('destroy', 'destroy3.wav');
        this.load.audio('landing', 'landing.wav');
        this.load.audio('running', 'running.wav');
        this.load.audio('throw', 'throw.wav');

        this.load.aseprite('MC-idle', 'MC-idle.png', 'MC-idle.json');
        this.load.aseprite('mudthrower-throw', 'mudthrower-throw.png', 'mudthrower-throw.json');
        this.load.aseprite('breakable', 'breakableplatform.png', 'breakableplatform.json');
    
        this.load.image("tilesheet", "tilemap.png");    // tile sheet
        this.load.tilemapTiledJSON("testscene", "LVL48X48.json");    // Tiled JSON file
    }

    create() {
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#FFFFFF',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }

        this.menu = this.add.text(60, game.config.height/2-40, 
            "WASD to move, Space to dash. Hold shift to shield \nand Mouse to aim bullet, release Shift to launch.\nPress [Space] to start.",
            this.menuConfig);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(spacebar)){
            this.scene.start('playScene');
        }
    }
}