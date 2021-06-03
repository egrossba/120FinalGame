class Slapper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5).setScale(0.1, 0.15);
        this.body.setSize();
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.right = true;
        this.startPoint = this.x;
        this.isSlapping = false;
        this.lives = enemyLives;
    }

    update(){
        if(this.right && !this.isSlapping){
            this.setVelocity(25, 0);
            this.flipX = true;
        }
        else if(!this.right && !this.isSlapping){
            this.setVelocity(-25, 0);
            this.flipX = false;
        }
        else{
            this.setVelocity(0);
        }
        if(this.x > this.startPoint + 75){
            this.right = false;
        }
        if(this.x < this.startPoint - 75){
            this.right = true;
        }

        if(Phaser.Math.Distance.BetweenPoints(player.body.position, this.body.position) < 100 && this.body.enable == true){
            this.isSlapping = true;
            this.setTint(0xFF7878);
            this.flipX = player.body.x > this.body.x;
            //this.anims.play('slap', true);
        }
        else{
            this.isSlapping = false;
            this.setTint(0xFFFFFF);
            //this.anims.stop();
        }
    }

    takeHit(){
        this.lives--;
        if(this.lives > 0){
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x - this.displayWidth/2 - 5, this.y, 'bunny');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // squash enemy
            this.y += 20;
            this.setScale(0.1, 0.05);
            this.body.enable = false;
            this.scene.time.delayedCall(5000, () => {
                this.y -= 20;
                this.setScale(0.05, 0.1);
                this.body.enable = true;
            });

            
        }
        else{
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x + this.displayWidth/2 + 5, this.y, 'bunny');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // kill enemy
            this.y += 30;
            this.setScale(0.05, 0.025);
            this.body.enable = false;
            this.scene.time.delayedCall(2500, () => { 
                this.setAlpha(0);
            });
        }
    }
}