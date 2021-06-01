class Destructable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5).setScale(0.7, 0.7);
        this.body.setSize();
        this.body.allowGravity = false;
        this.body.immovable = true;
    }
}