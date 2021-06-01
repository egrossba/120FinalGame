class Read extends Phaser.Scene {
    constructor() {
        super('readScene');
    }

    create() {
        this.scene.bringToTop(this);
        this.scenes = game.scene.getScenes(false);

        this.paper = this.add.sprite(game.config.width/2, game.config.height/2, "bunny").setOrigin(0.5).setScale(0.8);
        this.add.text(game.config.width/2, game.config.height/2, newspaperText).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height*14/15, '[space] to exit').setOrigin(0.5);

        this.tweens.add({
            targets: this.paper,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.8 },
            angle: { from: 0, to: 360 },
            ease: 'Sine.easeInOut',
            duration: 500
        });
        
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