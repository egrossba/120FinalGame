class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    init(vel){
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.x = Phaser.Math.Between(this.displayWidth/2, game.config.width - this.displayWidth/2);
        this.y = -this.displayHeight/2;
        this.body.allowGravity = false;
        this.setImmovable(true).setSize(2100,2100);
        this.setVelocityY(vel);
        this.rot = Phaser.Math.FloatBetween(0.1, 0.4);
        this.spin = Phaser.Math.Between(0, 1);
        this.newObstacle = true;
    }

    update() {
        if(this.newObstacle && this.y > game.config.height/3){
            this.newObstacle = false;
            this.scene.addObstacle();
        }

        if(this.y > game.config.height + this.height/2){
            this.destroy();
        }

        this.spin ? this.angle += this.rot : this.angle -= this.rot;
    }
}