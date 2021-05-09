class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.image('bunny', 'bunny.png');
    }

    create() {
        

    }

    update() {
        this.scene.start('playScene');
    }
}