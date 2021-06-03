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
            this.healthBars.add(this.add.sprite(40 + 40*i, 40, 'bunny').setScale(0.1));
        }
    }

    update(){
        // health bar changes
        for(let i = 0; i < maxHealth - playerHealth; i++){
            this.healthBars.getChildren()[maxHealth-1-i].setAlpha(0);
        }
        if(player.died){
            this.healthBars.getChildren().forEach((bar) => {
                bar.setAlpha(1);
            });
        }
    }
}