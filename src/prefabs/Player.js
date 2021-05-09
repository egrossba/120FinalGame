class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setScale(SCALE/4).setOrigin(0.5);
        this.body.allowGravity = false;
        this.body.immovable = false;
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true);
        this.isDashing = false;
    }


    update() {
        // Gravity
        if(!this.isDashing){
            this.setVelocityY(GRAVITY);
        }

        // Move side to side
        if(keyA.isDown && !this.isDashing){
            this.setVelocityX(-VELOCITY);
        }
        else if(keyD.isDown && !this.isDashing){
            this.setVelocityX(VELOCITY);
        }
        else if(!this.isDashing){
            this.setVelocityX(0);
        }

        // Dash (need to do every case)
        if(Phaser.Input.Keyboard.JustDown(spacebar)){
            this.isDashing = true;
            if(keyW.isDown && !keyA.isDown && !keyD.isDown && !keyS.isDown){
                this.setVelocityY(-DASH_VELOCITY);
            }
            if(!keyW.isDown && !keyA.isDown && !keyD.isDown && keyS.isDown){
                this.setVelocityY(DASH_VELOCITY);
            }
            if(!keyW.isDown && keyA.isDown && !keyD.isDown && !keyS.isDown){
                this.setVelocityX(-DASH_VELOCITY);
            }
            if(!keyW.isDown && !keyA.isDown && keyD.isDown && !keyS.isDown){
                this.setVelocityX(DASH_VELOCITY);
            }
            this.scene.time.delayedCall(DASH_TIME, () => { 
                this.setVelocity(0);
                this.isDashing = false;
            });
        }
    }
}
