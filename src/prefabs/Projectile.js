class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5);
        this.body.allowGravity = false;
        this.setVelocityX(VELOCITY).setMaxVelocity(VELOCITY).setCollideWorldBounds(true).setBounce(1);
        this.caught = false;
    }

    update(){
        if(this.caught == true){
            this.x = this.scene.player.x;
            this.y = this.scene.player.y;
        }
    }

    follow(){
        
    }
}