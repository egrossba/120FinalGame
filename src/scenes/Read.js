class Read extends Phaser.Scene {
    constructor() {
        super('readScene');
    }

    create() {
        this.scene.bringToTop(this);
        this.scenes = game.scene.getScenes(false);

        // check newspaper access
        newsAccess[levelNum] = 1; 

        // paper ball for each level
        this.paper = this.add.sprite(game.config.width/2, game.config.height/2, newsIssue[levelNum]).setOrigin(0.5);
        // newspaper title and messages
        this.add.text(game.config.width/2, game.config.height - 45, newsTitle[levelNum]).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - 20, '[space] to exit').setOrigin(0.5);
        
        this.tweens.add({
            targets: this.paper, 
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.285 },
            angle: { from: 0, to: 360 },
            ease: 'Sine.easeInOut',
            duration: 500 
        });
        
        // space to close newspaper
        this.input.keyboard.once('keydown-SPACE', () => {
            this.unpause();
        });
    }

    unpause() {
        this.scene.stop();
        this.scenes.forEach((s) => {
            if(this.scene.isPaused(s)){
                this.scene.resume(s);
                s.cameras.main.setAlpha(1);
            }
        });
    }
}