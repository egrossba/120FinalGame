class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.layer = this.add.layer();
        this.physics.world.gravity.y = GRAVITY;

        // keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // gameobjects
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'bunny');
        this.foundation = new Destructable(this, game.config.width/3, game.config.height/2, 'butler');
        this.bullet = new Projectile(this, game.config.width*2/3, 0, 'shadow');
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0);

        // init game objects
        this.player.init();
        this.foundation.init();
        this.bullet.init();

        // layer
        // layer
        let objects = [this.background, this.player, this.foundation, this.bullet];
        this.layer.add(objects);

        // add physics colliders
        // dash destroy
        this.physics.add.collider(this.player, this.foundation, (p, f) => {
            if(p.isDashing){
                f.setAlpha(0);
                f.body.enable = false;
            }
            this.time.delayedCall(5000, () => { 
                f.setAlpha(1);
                f.body.enable = true;
            });
        });

        // shield deflect
        this.physics.add.overlap(this.player, this.bullet, (p, b) => {
            if(p.isShielding){
                b.x = p.x;
                b.y = p.y;
                switch(p.deflect){
                    case 'up' : 
                        if(shift.isUp){
                            b.setVelocity(0, -VELOCITY);
                        }
                        break;
                    case 'down':
                        if(shift.isUp){
                            b.setVelocity(0, VELOCITY);
                        }
                        break;
                    case 'left':
                        if(shift.isUp){
                            b.setVelocity(-VELOCITY, 0);
                        }
                        break;
                    case 'right':
                        if(shift.isUp){
                            b.setVelocity(-VELOCITY, 0);
                        }
                        break;
                    case 'upleft':
                        if(shift.isUp){
                            b.setVelocity(-DIAG_DASH, -DIAG_DASH);
                        }
                        break;
                    case 'upright':
                        if(shift.isUp){
                            b.setVelocity(DIAG_DASH, -DIAG_DASH);
                        }
                        break;
                    case 'downleft':
                        if(shift.isUp){
                            b.setVelocity(-DIAG_DASH, DIAG_DASH);
                        }
                        break;
                    case 'downright':
                        if(shift.isUp){
                            b.setVelocity(DIAG_DASH, DIAG_DASH);
                        }
                        break;
                }
            }
            else{
                p.takeHit();
            }
        });

        // gameover bool

        // score
    }

    update() {
        // combos
        validCombo = wCombo || sCombo || aCombo || dCombo || wdCombo || waCombo || sdCombo || saCombo;
        wCombo = keyW.isDown && !keyA.isDown && !keyD.isDown && !keyS.isDown;
        sCombo = !keyW.isDown && !keyA.isDown && !keyD.isDown && keyS.isDown;
        aCombo = !keyW.isDown && keyA.isDown && !keyD.isDown && !keyS.isDown;
        dCombo = !keyW.isDown && !keyA.isDown && keyD.isDown && !keyS.isDown;
        wdCombo = keyW.isDown && !keyA.isDown && keyD.isDown && !keyS.isDown;
        waCombo = keyW.isDown && keyA.isDown && !keyD.isDown && !keyS.isDown;
        sdCombo = !keyW.isDown && !keyA.isDown && keyD.isDown && keyS.isDown;
        saCombo = !keyW.isDown && keyA.isDown && !keyD.isDown && keyS.isDown
        
        // move player
        this.player.update();
        this.bullet.update();
    }

}
