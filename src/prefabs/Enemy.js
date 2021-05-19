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
        this.setCollideWorldBounds(true);
    }

    update(){
        this.body.setSize(this.frame.width, this.frame.height).setOffset(this.frame.x, this.frame.y);
    }
}