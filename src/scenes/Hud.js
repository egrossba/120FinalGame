class Hud extends Phaser.Scene {
    constructor() {
        super('hudScene');
    }

    create() {
        this.scene.bringToTop(this);
        this.scenes = game.scene.getScenes(false);

        // health bars
        this.healthBars = this.add.group();
        for(let i = 0; i < player.hp; i++){
            this.healthBars.add(this.add.sprite(40 + 40*i, 40, 'bunny').setScale(0.1));
        }
    }

    update(){
        if(player.hp < maxHealth){
            this.healthBars.getChildren()[player.hp].setAlpha(0);
        }
        if(player.died){
            this.healthBars.getChildren().forEach((bar) => {
                bar.setAlpha(1);
            });
        }
    }
}