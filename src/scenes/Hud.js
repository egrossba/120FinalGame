class Hud extends Phaser.Scene {
    constructor() {
        super('hudScene');
    }

    create() {
        this.scene.bringToTop(this);
        this.scenes = game.scene.getScenes(false);

        // health bars
        this.healthBars = this.add.group();
        for(let i = 0; i < maxHealth; i++){
            this.healthBars.add(this.add.sprite(40 + 40*i, 40, 'bunny').setScale(0.1).setAlpha(0));
        }

        // newspaper icon journal
        this.journal = this.add.sprite(30 + 10, 150, 'icon').setScale(0.18).setAlpha(1).setInteractive()
        .on('pointerover', () => {
            this.journal.setTint(0x955FEF);
        }) 
        .on('pointerout', () => {
            this.journal.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            if(!this.scene.isActive('newspaperAccessScene')){
            this.scene.pause('playScene');
            this.scene.launch('newspaperAccessScene');
            } else {
                this.scene.stop('newspaperAccessScene');
                this.scene.resume('playScene');
            } // if you newspaperAccessScene is not active, you stop it and back to playScene
        });
    }

    update(){
        // health bar changes
        // subtract health
        for(let i = 0; i < playerHealth; i++){
            this.healthBars.getChildren()[i].setAlpha(1);
        }
        for(let i = playerHealth; i < maxHealth; i++){
            this.healthBars.getChildren()[i].setAlpha(0);
        }

        // reset on death
        if(player.died){
            this.healthBars.getChildren().forEach((bar) => {
                bar.setAlpha(1);
            });
        }
    }
}