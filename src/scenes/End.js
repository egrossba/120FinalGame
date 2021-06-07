class End extends Phaser.Scene {
    constructor() {
        super('endScene');
    }

    create() {
        this.scene.bringToTop(this);
        this.scenes = game.scene.getScenes(false);

        // paper image
        this.paper1 = this.add.sprite(game.config.width*1/6 + 10, game.config.height/2, newsIssue[levelNum]).setOrigin(0.5);
        this.paper2 = this.add.sprite(game.config.width*2/3, game.config.height/2, newsIssue[levelNum+1]).setOrigin(0.5);

        // newspaper title and messages
        this.add.text(game.config.width/2, game.config.height - 20, '[space] to exit').setOrigin(0.5);
        
        this.tweens.add({
            targets: this.paper1, 
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.2 },
            ease: 'Sine.easeInOut',
            duration: 2000 
        });
        this.tweens.add({
            targets: this.paper2, 
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.22 },
            ease: 'Sine.easeInOut',
            duration: 2000 
        });
        
        // space to close newspaper
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.stop();
            levelNum = 0;
            this.scene.start('menuScene');
        });
    }
}