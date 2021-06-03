class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5).setScale(0.3);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.flipX ? this.mult = 10.5 : this.mult = 1;
        this.lives = enemyLives;
    }

    update(){
        this.body.setSize(this.frame.width, this.frame.height).setOffset(this.frame.x*this.mult, this.frame.y);
    }

    takeHit(){
        this.lives--;
        if(this.lives > 0){
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x - this.displayWidth/2 - 5, this.y, 'bunny');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // squash enemy
            this.y += 15;
            this.setScale(0.3, 0.05);
            this.body.enable = false;
            this.scene.time.delayedCall(5000, () => { 
                this.y -= 15;
                this.setScale(0.25);
                this.body.enable = true;
            });

            
        }
        else{
            // spawn health pack
            let hPack = new HealthPack(this.scene, this.x + this.displayWidth/2 + 5, this.y, 'bunny');
            hPack.init();
            this.scene.healthPacks.add(hPack);

            // kill enemy
            this.y += 15;
            this.setScale(0.25, 0.05);
            this.body.enable = false;
            this.scene.time.delayedCall(2500, () => { 
                this.setAlpha(0);
            });
        }
    }
}