class Read extends Phaser.Scene {
    constructor() {
        super('readScene');
    }

    create() {
        this.scene.bringToTop(this);
        this.scenes = game.scene.getScenes(false);

        this.add.sprite(game.config.width/2, game.config.height/2, "bunny").setOrigin(0.5).setScale(0.8);
        this.add.text(game.config.width/2, game.config.height/2, newspaperText).setOrigin(0.5);
        
        // space to close bunny
        this.input.keyboard.once('keydown-SPACE', () => {
            this.unpause();
        });
    }

    unpause() {
        this.scene.stop();
        this.scenes.forEach((s) => {
            if(this.scene.isPaused(s)){
                this.scene.resume(s);
            }
        });
    }
}