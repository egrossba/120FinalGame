class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setScale(SCALE*2/3).setOrigin(0.5);
        this.body.allowGravity = false;
        this.setVelocityY(VELOCITY).setMaxVelocity(VELOCITY).setCollideWorldBounds(true).setBounce(1);
        // this.scene.time.delayedCall(7000, () => { 
        //     this.setAlpha(0);
        //     this.body.enable = false;
        // });
    }

    update(){

    }
}