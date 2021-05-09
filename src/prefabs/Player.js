class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.setScale(SCALE/4).setOrigin(0.5);
        this.body.allowGravity = true;
        this.body.immovable = false;
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true);
        this.isDashing = false;
    }


    update() {
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

        // Dash
        if(Phaser.Input.Keyboard.JustDown(spacebar)){
            this.isDashing = true;
            if(wCombo){
                this.setVelocityY(-DASH_VELOCITY);
                this.scene.time.delayedCall(DASH_TIME, () => { 
                    this.setVelocity(0);
                    this.isDashing = false;
                });
            }
            else if(sCombo){
                this.setVelocityY(DASH_VELOCITY);
                this.scene.time.delayedCall(DASH_TIME, () => { 
                    this.setVelocity(0);
                    this.isDashing = false;
                });
            }
            else if(aCombo){
                this.setVelocityX(-DASH_VELOCITY);
                this.scene.time.delayedCall(DASH_TIME, () => { 
                    this.setVelocity(0);
                    this.isDashing = false;
                });
            }
            else if(dCombo){
                this.setVelocityX(DASH_VELOCITY);
                this.scene.time.delayedCall(DASH_TIME, () => { 
                    this.setVelocity(0);
                    this.isDashing = false;
                });
            }
            else if(wdCombo){
                this.setVelocity(DIAG_DASH, -DIAG_DASH);
                this.scene.time.delayedCall(DASH_TIME, () => { 
                    this.setVelocity(0);
                    this.isDashing = false;
                });
            }
            else if(waCombo){
                this.setVelocity(-DIAG_DASH, -DIAG_DASH);
                this.scene.time.delayedCall(DASH_TIME, () => { 
                    this.setVelocity(0);
                    this.isDashing = false;
                });
            }
            else if(sdCombo){
                this.setVelocity(DIAG_DASH, DIAG_DASH);
                this.scene.time.delayedCall(DASH_TIME, () => { 
                    this.setVelocity(0);
                    this.isDashing = false;
                });
            }
            else if(saCombo){
                this.setVelocity(-DIAG_DASH, DIAG_DASH);
                this.scene.time.delayedCall(DASH_TIME, () => { 
                    this.setVelocity(0);
                    this.isDashing = false;
                });
            }
        }
    }
}
