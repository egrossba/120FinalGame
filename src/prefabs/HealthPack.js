class HealthPack extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setScale(0.05).setAlpha(0.5);
        this.body.immovable = true;
        this.body.allowGravity = false;
    }

    update(){
        
    }
}