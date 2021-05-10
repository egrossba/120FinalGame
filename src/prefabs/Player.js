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
        this.dashesUsed = 0;
        this.isShielding = false;
    }


    update() {
        // Move side to side
        if(keyA.isDown && !this.isDashing && !this.isShielding){
            this.setVelocityX(-VELOCITY);
        }
        else if(keyD.isDown && !this.isDashing && !this.isShielding){
            this.setVelocityX(VELOCITY);
        }
        else if(!this.isDashing && !this.isShielding){
            this.setVelocityX(0);
        }

        // Dash

        // Reset on ground touch
        if(this.body.onFloor()){
            this.dashesUsed = 0;
        }
        // Check and execute combo (need to check if touching)
        if(validCombo && this.dashesUsed < DASH_LIMIT && Phaser.Input.Keyboard.JustDown(spacebar)){
            this.isDashing = true;
            if(wCombo){
                this.setVelocityY(-DASH_VELOCITY);
            }
            else if(sCombo){
                this.setVelocityY(DASH_VELOCITY);
            }
            else if(aCombo){
                this.setVelocityX(-DASH_VELOCITY);
            }
            else if(dCombo){
                this.setVelocityX(DASH_VELOCITY);
            }
            else if(wdCombo){
                this.setVelocity(DIAG_DASH, -DIAG_DASH);
            }
            else if(waCombo){
                this.setVelocity(-DIAG_DASH, -DIAG_DASH);
            }
            else if(sdCombo){
                this.setVelocity(DIAG_DASH, DIAG_DASH);
            }
            else if(saCombo){
                this.setVelocity(-DIAG_DASH, DIAG_DASH);
            }
            this.scene.time.delayedCall(DASH_TIME, () => { 
                this.setVelocity(0);
                this.isDashing = false;
                this.dashesUsed++;
            });
        }

        // Shield

        // Check and execute combo
        if(validCombo && shift.isDown){
            this.isShielding = true;
            this.setVelocity(0);
            if(wCombo){
                this.setTint(0x00FF00, 0x00FF00, 0xFFFFFF, 0xFFFFFF);
            }
            else if(sCombo){
                this.setTint(0xFFFFFF, 0xFFFFFF, 0x00FF00, 0x00FF00);
            }
            else if(aCombo){
                this.setTint(0x00FF00, 0xFFFFFF, 0x00FF00, 0xFFFFFF);
            }
            else if(dCombo){
                this.setTint(0xFFFFFF, 0x00FF00, 0xFFFFFF, 0x00FF00);
            }
            else if(wdCombo){
                this.setTint(0xFFFFFF, 0x00FF00, 0xFFFFFF, 0xFFFFFF);
            }
            else if(waCombo){
                this.setTint(0x00FF00, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
            }
            else if(sdCombo){
                this.setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0x00FF00);
            }
            else if(saCombo){
                this.setTint(0xFFFFFF, 0xFFFFFF, 0x00FF00, 0xFFFFFF);
            }
        }
        else{
            this.isShielding = false;
            this.setTint(0xFFFFFF);
        }
    }
}
