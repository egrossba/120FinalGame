class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5);
        this.body.allowGravity = false;
        this.setVelocityX(VELOCITY).setMaxVelocity(VELOCITY).setBounce(1);
        this.caught = false;
        this.wasThrown = false;
    }

    update(){
        if(this.caught == true){
            this.x = player.x;
            this.y = player.y;
        }
    }
}