class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setScale(SCALE).setOrigin(0.5);
        this.body.allowGravity = false;
        this.setVelocityY(VELOCITY);
    }

    update(){
        if(this.y > game.config.height || this.y < 0){
            this.y = 0;
            this.setVelocityY(VELOCITY);
        }
    }
}