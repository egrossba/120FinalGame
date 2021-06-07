class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        game.input.mouse.capture = true;
    }

    init(){
        this.setOrigin(0.5).setScale(1);
        this.body.setSize(this.frame.width, this.frame.height).setOffset(this.frame.x, this.frame.y);
        this.body.allowGravity = true;
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL);
        this.isDashing = false;
        this.dashes = 2;
        this.shields = 1;
        this.isShielding = false;
        this.launched = false;
        this.invuln = false;
        this.gotHit = false;
        this.falling = false;
        this.running = false;
        this.died = false;
        this.pointer = game.input.mousePointer;
    }


    update() {
        // Move side to side
        if(keyA.isDown && !this.isDashing && !shift.isDown){
            this.flipX = true;
            if(this.falling){
                this.setVelocityX(-VELOCITY*3/4);
            }
            else{
                this.play('run', true);
                this.setVelocityX(-VELOCITY);
                if(!this.running){
                    this.scene.runningSound.play();
                    this.running = true;
                }
            }
        }
        else if(keyD.isDown && !this.isDashing && !shift.isDown){
            this.flipX = false;
            if(this.falling){
                this.setVelocityX(VELOCITY*3/4);
            }
            else{
                this.play('run', true);
                this.setVelocityX(VELOCITY);
                if(!this.running){
                    this.scene.runningSound.play();
                    this.running = true;
                }
            }
        }
        else if(!this.isDashing && !shift.isDown){
            this.setVelocityX(0);
            this.play('idle', true);
        }
        
        // stop running sound
        if(!this.body.onFloor() || this.body.velocity.x == 0){
            this.scene.runningSound.stop();
            this.running = false;
        }

        // Dash

        // Reset on ground touch
        if(!this.isDashing && this.body.onFloor()){
            if(this.falling){
                this.scene.landingSound.play();
            }
            this.falling = false;
            this.dashes = 2;
            this.shields = 1;
        }

        if(this.body.velocity.y > 0){
            this.falling = true;
        }

        // Check and execute combo (need to check if touching)
        if(validCombo && this.dashes > 0 && Phaser.Input.Keyboard.JustDown(spacebar)){
            this.isDashing = true;
            this.invuln = true;
            this.body.allowGravity = false;
            this.scene.dashSound.play();
            this.play('dash', true);
            if(wCombo){
                this.setVelocity(0, -DASH_VELOCITY);
            }
            else if(sCombo){
                this.setVelocity(0, DASH_VELOCITY);
            }
            else if(aCombo){
                this.setVelocity(-DASH_VELOCITY, 0);
            }
            else if(dCombo){
                this.setVelocity(DASH_VELOCITY, 0);
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
                this.body.allowGravity = true;
                this.setVelocity(0);
                this.isDashing = false;
                if(this.isShielding){
                    this.play('shield', true);
                }
                else{
                    this.play('idle', true);
                }
                this.dashes--;
            });
            this.scene.time.delayedCall(DASH_TIME + 200, () => { 
                this.invuln = false;
            });
        }

        // Shield
        if(this.shields > 0){
            if(Phaser.Input.Keyboard.JustDown(shift)){
                this.play('shield', true);
                this.scene.shieldSound.play();
                this.setVelocity(0);
                this.body.allowGravity = false;
                this.scene.time.delayedCall(100, () => { 
                    this.body.allowGravity = true;
                });
            }
    
            if(shift.isDown){
                this.isShielding = true;
                this.rotation = Phaser.Math.TAU + Phaser.Math.Angle.Between(this.x, this.y, 
                    this.pointer.worldX, this.pointer.worldY);
            }
        }
        
        if(Phaser.Input.Keyboard.JustUp(shift)){
            this.shields--;
            this.isShielding = false;
            this.rotation = 0;
        }

        // Invuln on throw
        if(this.launched == true){
            this.scene.time.delayedCall(200, () => { 
                this.launched = false;
            });
        }

        // die
        if(playerHealth == 0){
            this.died = true;
            this.x = this.scene.spawn.x;
            this.y = this.scene.spawn.y;
            playerHealth = maxHealth;
        }
        else{
            this.died = false;
        }
    }

    takeHit(){
        if(!this.launched && !this.gotHit && !this.invuln){
            this.scene.cameras.main.shake(100, 0.015);
            this.scene.hitSound.play();
            this.setAlpha(0.5);
            this.setTint(0xFF7878);
            playerHealth--;
            this.gotHit = true;
            this.scene.time.delayedCall(1000, () => { 
                this.setAlpha(1);
                this.clearTint();
                this.gotHit = false;
            });
        }
    }

    gainHealth(){
        playerHealth++;
        this.setTintFill(0x3EB489);
        this.scene.time.delayedCall(500, () => {
            this.clearTint();
        });
    }
}
