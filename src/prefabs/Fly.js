class Fly extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5).setScale(0.2);
        this.body.allowGravity = false;
        this.right = true;
        this.startPoint = this.x;
    }

    update(){
        this.right ? this.setVelocity(100, 0) : this.setVelocity(-100, 0);
        if(this.x > this.startPoint + 100){
            this.right = false;
        }
        if(this.x < this.startPoint - 100){
            this.right = true;
        }
    }
}