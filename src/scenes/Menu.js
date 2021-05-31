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
        this.load.tilemapTiledJSON("testscene", "LVL48X48.json");    // Tiled JSON file
    }

    create() {
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

        this.menu = this.add.text(game.config.width/2, game.config.height/2, 
            "WASD to move, Space to dash. Hold Shift to catch \nand Mouse to aim ball, release Shift to launch.\nPress [Space] to start.",
            this.menuConfig).setOrigin(0.5);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(spacebar)){
            this.scene.start('playScene');
        }
    }
}