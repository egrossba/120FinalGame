class Fly extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5).setScale(1.25);
        this.body.setSize();
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.right = true;
        this.startPoint = this.x;
        this.lives = enemyLives;
        this.buzzing = false;
    }

    update(){
        if(Phaser.Math.Distance.BetweenPoints(player.body.position, this.body.position) < 300 && this.body.enable == true){
            if(!this.buzzing){
                this.scene.flyriderSound.play();
                this.buzzing = true;
            }
        }
        else{
            this.scene.flyriderSound.stop();
            this.buzzing = false;
        }

        this.play('wingflap', true);

        this.body.setSize(this.frame.width, this.frame.height).setOffset(this.frame.x, this.frame.y);
        
        this.right ? this.setVelocity(100, 0) : this.setVelocity(-100, 0);
        if(this.x > this.startPoint + 100){
            this.right = false;
        }
        if(this.x < this.startPoint - 100){
            this.right = true;
        }
    }

    takeHit(){
        this.lives--;
        if(this.lives > 0){
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x - this.displayWidth/2 - 5, this.y, 'heart');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // squash enemy
            this.setScale(1.25, 0.3).setAlpha(0.5);
            this.body.enable = false;
            this.scene.time.delayedCall(5000, () => {
                this.setScale(1).setAlpha(1);
                this.body.enable = true;
            });

            
        }
        else{
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x + this.displayWidth/2 + 5, this.y, 'heart');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // kill enemy
            this.setScale(1, 0.3).setAlpha(0.5);
            this.body.enable = false;
            this.scene.time.delayedCall(1000, () => { 
                this.setAlpha(0);
            });
        }
    }
}