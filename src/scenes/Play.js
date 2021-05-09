class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.layer = this.add.layer();
        this.physics.world.gravity.y = GRAVITY;

        // platform and character
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'bunny');
        this.player.init();

        // layer
        this.layer.add(this.player);

        // keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // add physics colliders
        
        // gameover bool

        // score
    }

    update() {
        // move player
        this.player.update();
    }
}
