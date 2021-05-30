class Pause extends Phaser.Scene {
    constructor() {
        super('pauseScene');
    }

    create() {
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

        this.resBut = this.add.text(game.config.width/2, game.config.height/3, 
            'resume', this.menuConfig).setOrigin(0.5).setInteractive()
        .on('pointerover', () => {
            this.resBut.setStyle({ backgroundColor: '#00FF00' }); 
        })
        .on('pointerout', () => {
            this.resBut.setStyle({ backgroundColor: '#FFFFFF' });
        })
        .on('pointerdown', () => {
            this.unpause();
        });

        this.menuBut = this.add.text(game.config.width/2, game.config.height*2/3, 
            'menu', this.menuConfig).setOrigin(0.5).setInteractive()
        .on('pointerover', () => {
            this.menuBut.setStyle({ backgroundColor: '#00FF00' }); 
        })
        .on('pointerout', () => {
            this.menuBut.setStyle({ backgroundColor: '#FFFFFF' });
        })
        .on('pointerdown', () => {
            this.scene.stop();
            this.scene.stop('playScene');
            this.scene.launch('menuScene');
        });

        esc.on('down', () => {
            this.unpause();
        });
    }

    unpause() {
        this.scene.stop();
        this.scene.resume('playScene');
    }
}