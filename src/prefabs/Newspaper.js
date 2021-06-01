class Newspaper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.body.setImmovable(true);
        //this.body.setAllowGravity(false);

    }

    init(){
        this.setScale(0.25);
        this.body.immovable = true;
        this.body.allowGravity = false;
        this.text = 'Waow a newspaper';
    }

    update(){
        
    }
}