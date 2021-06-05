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

        // newspaper icon
        //console.log("Newspaper.js");
        this.newspapers = this.add.group();
        this.newspapers.add(this.add.sprite(30 + 10, 150, 'icon').setScale(0.18).setAlpha(0));
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

        this.newspapers.getChildren()[0].setAlpha(1);

        // reset on death
        if(player.died){
            this.healthBars.getChildren().forEach((bar) => {
                bar.setAlpha(1);
            });
        }
    }
}