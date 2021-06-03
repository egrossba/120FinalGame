class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        game.input.mouse.capture = true;
    }

    init(){
        this.setOrigin(0.5).setScale(0.33);
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

        // animations
        this.anims.create({ 
            key: 'idle',
            frames: this.anims.generateFrameNames('MC-idle', {      
                prefix: 'Sprite-0003-Recovered',
                start: 1,
                end: 9,
                suffix: '',
                zeroPad: 0 
            }), 
            frameRate: 2.5,
            repeat: -1
        });
    }


    update() {
        this.body.setSize(this.frame.width, this.frame.height).setOffset(this.frame.x, this.frame.y);

        // Move side to side
        if(keyA.isDown && !this.isDashing && !shift.isDown){
            this.flipX = true;
            if(this.running == false){
                this.setVelocityX(-VELOCITY*3/4);
                this.scene.runningSound.play();
            }
            else{
                this.setVelocityX(-VELOCITY);
            }
            this.running = true;
            this.anims.stop();
        }
        else if(keyD.isDown && !this.isDashing && !shift.isDown){
            this.flipX = false;
            if(this.running == false){
                this.setVelocityX(VELOCITY*3/4);
                this.scene.runningSound.play();
            }
            else{
                this.setVelocityX(VELOCITY);
            }
            this.running = true;
            this.anims.stop();
        }
        else if(!this.isDashing && !shift.isDown){
            this.setVelocityX(0);
            this.anims.play('idle', true);
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
                this.dashes--;
            });
            this.scene.time.delayedCall(DASH_TIME + 200, () => { 
                this.invuln = false;
            });
        }

        // Shield
        if(this.shields > 0){
            if(Phaser.Input.Keyboard.JustDown(shift)){
                this.scene.shieldSound.play();
                this.setVelocity(0);
                this.body.allowGravity = false;
                this.scene.time.delayedCall(100, () => { 
                    this.body.allowGravity = true;
                });
            }
    
            if(shift.isDown){
                this.isShielding = true;
                this.setTint(0x00FF00);
                this.rotation = Phaser.Math.TAU + Phaser.Math.Angle.Between(this.x, this.y, 
                    this.pointer.worldX, this.pointer.worldY);
            }
        }
        
        if(Phaser.Input.Keyboard.JustUp(shift)){
            this.shields--;
            this.isShielding = false;
            this.rotation = 0;
            this.setTint(0xFFFFFF);
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
        this.scene.cameras.main.shake(100, 0.015);
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

    gainHealth(){
        playerHealth++;
        this.setTintFill(0x3EB489);
        this.scene.time.delayedCall(500, () => {
            this.clearTint();
        });
    }
}
