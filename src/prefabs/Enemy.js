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

        this.anims.create({ 
            key: 'throw',
            frames: this.anims.generateFrameNames('mudthrower', {      
                prefix: 'mudthrower-throw',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 0 
            }), 
            frameRate: 10,
            repeat: 0
        });
    }

    update(){

    }
}