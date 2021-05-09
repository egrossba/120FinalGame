class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setScale(.1).setOrigin(0.5);
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true).setBounce(1);
        this.mode = 'up';
    }

    bounce() {
        switch(this.mode){
            case 'up':
                this.setVelocity(0, JUMP_VELOCITY);
                break;
            case 'down':
                this.setVelocity(0, JUMP_VELOCITY*3/5);
                break;
            case 'left':
                this.setVelocity(-VELOCITY/2, JUMP_VELOCITY*3/4);
                break;
            case 'right':
                this.setVelocity(VELOCITY/2, JUMP_VELOCITY*3/4);
                break;
        }
    }
}