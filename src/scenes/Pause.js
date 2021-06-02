class Pause extends Phaser.Scene {
    constructor() {
        super('pauseScene');
    }

    create() {
        this.scene.bringToTop(this);
        this.scenes = game.scene.getScenes(false);

        esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
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

        this.resumeBut = this.add.sprite(game.config.width/2, game.config.height*3/7, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.resumeBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.resumeBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            this.unpause();
        });
        this.resumeText = this.add.sprite(game.config.width/2, game.config.height*3/7, 'resume').setOrigin(.5).setScale(.25);
        

        this.menuBut = this.add.sprite(game.config.width/2, game.config.height*4/7, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.menuBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.menuBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            this.scenes.forEach((s) => {
                this.scene.stop(s);
            });
            this.cameras.main.fadeOut(1000);
            this.scene.start('menuScene');
        });
        this.resumeText = this.add.sprite(game.config.width/2, game.config.height*4/7, 'menu').setOrigin(.5).setScale(.25);

        esc.on('down', () => {
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