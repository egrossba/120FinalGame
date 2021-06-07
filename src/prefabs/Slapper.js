class Slapper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5).setScale(0.25);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.isSlapping = false;
        this.lives = enemyLives;
    }

    update(){
        this.play('mudclub', true);

        this.body.setSize(this.frame.width, this.frame.height).setOffset(this.frame.x, this.frame.y);

        if(Phaser.Math.Distance.BetweenPoints(player.body.position, this.body.position) < 100 && this.body.enable == true){
            if(!this.isSlapping){
                this.scene.slapSound.play();
            }
            this.isSlapping = true;
            this.setTint(0xFF7878);
            this.flipX = player.body.x < this.body.x;
        }
        else{
            this.isSlapping = false;
            this.scene.slapSound.stop();
            //this.setFrame('0');
            this.setTint(0xFFFFFF);
        }
    }

    takeHit(){
        this.lives--;
        if(this.lives > 0){
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x - 35 - 5, this.y, 'heart');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // squash enemy
            this.y += 25;
            this.setScale(0.25, 0.05).setAlpha(0.5);
            this.body.enable = false;
            this.scene.time.delayedCall(5000, () => {
                this.y -= 15;
                this.setScale(0.15).setAlpha(1);
                this.body.enable = true;
            });

            
        }
        else{
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x + 35 + 5, this.y, 'heart');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // kill enemy
            this.y += 20;
            this.setScale(0.15, 0.05).setAlpha(0.5);
            this.body.enable = false;
            this.scene.time.delayedCall(1000, () => { 
                this.setAlpha(0);
            });
        }
    }
}