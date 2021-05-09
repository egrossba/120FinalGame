class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setScale(SCALE/4).setOrigin(0.5);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true);
    }


    update() {
        
    }
}
