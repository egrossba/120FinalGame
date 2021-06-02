class Slapper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setOrigin(0.5).setScale(0.1, 0.15);
        this.body.setSize();
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.right = true;
        this.startPoint = this.x;
        this.isSlapping = false;
    }

    update(){
        if(this.right && !this.isSlapping){
            this.setVelocity(25, 0);
            this.flipX = true;
        }
        else if(!this.right && !this.isSlapping){
            this.setVelocity(-25, 0);
            this.flipX = false;
        }
        else{
            this.setVelocity(0);
        }
        if(this.x > this.startPoint + 75){
            this.right = false;
        }
        if(this.x < this.startPoint - 75){
            this.right = true;
        }

        if(Phaser.Math.Distance.BetweenPoints(player.body.position, this.body.position) < 100){
            this.isSlapping = true;
            this.setTint(0xFF7878);
            this.flipX = player.body.x > this.body.x;
            //this.anims.play('slap', true);
        }
        else{
            this.isSlapping = false;
            this.setTint(0xFFFFFF);
            //this.anims.stop();
        }
    }
}