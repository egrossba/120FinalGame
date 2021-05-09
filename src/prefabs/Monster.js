class Monster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setScale(SCALE/3*2).setOrigin(0.5);
        this.body.allowGravity = false;
        this.body.immovable = true;
        //this.setCollideWorldBounds(true);
        this.anims.create({ 
            key: 'chomp', 
            frames: this.anims.generateFrameNames('monster_atlas', {      
                prefix: 'Timeline 2_',
                start: 0,
                end: 13,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 20,
            repeat: -1
        });
        this.anims.play('chomp', true);
    }

    update() {
        this.x = Phaser.Math.Clamp(
            this.x,
            this.displayWidth/2,
            game.config.width - this.displayWidth/2);
    }
}