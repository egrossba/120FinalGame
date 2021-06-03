class Fly extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5).setScale(0.15);
        this.body.setSize();
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.right = true;
        this.startPoint = this.x;
        this.lives = enemyLives;
    }

    update(){
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
            let hPack = new HealthPack(this.scene, this.x - this.displayWidth/2 - 5, this.y, 'bunny');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // squash enemy
            this.setScale(0.15, 0.05);
            this.body.enable = false;
            this.scene.time.delayedCall(5000, () => {
                this.setScale(0.1);
                this.body.enable = true;
            });

            
        }
        else{
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x + this.displayWidth/2 + 5, this.y, 'bunny');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // kill enemy
            this.setScale(0.1, 0.05);
            this.body.enable = false;
            this.scene.time.delayedCall(2500, () => { 
                this.setAlpha(0);
            });
        }
    }
}