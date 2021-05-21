class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.layer = this.add.layer();
        this.physics.world.gravity.y = GRAVITY;

        this.anims.createFromAseprite('MC-idle');
        this.anims.createFromAseprite('mudthrower-throw');
        this.anims.createFromAseprite('breakable');

        //sfx
        this.dashSound = this.sound.add('dash', {volume: 0.2});
        this.shieldSound = this.sound.add('shield', {volume: 0.1});
        this.destroySound = this.sound.add('destroy', {volume: 2});

        // keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // gameobjects
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'MC-idle', 'Sprite-0003-Recovered1');
        this.foundation = new Destructable(this, game.config.width/3, game.config.height/2, 'breakable');
        this.bullet = new Projectile(this, game.config.width*2/3, game.config.height*2/3, 'clayball');
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0);
        this.mudthrower = new Enemy(this, 20, game.config.height*2/3, 'mudthrower-throw', '0');
        
        // init game objects
        this.player.init();
        this.foundation.init();
        this.bullet.init();
        this.mudthrower.init();

        // layer
        // layer
        let objects = [this.background, this.player, this.foundation, this.mudthrower, this.bullet];
        this.layer.add(objects);

        // add physics colliders
        this.setColliders();

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
        this.mudthrower.update();
    }

    setColliders(){
        // dash destroy
        this.physics.add.collider(this.player, this.foundation, (p, f) => {
            if(p.isDashing){
                p.dashesUsed--;
                p.shieldsUsed--;
                f.body.enable = false;
                f.play('die');
                this.destroySound.play();
            }
            this.time.delayedCall(5000, () => { 
                f.setFrame(0);
                f.body.enable = true;
            });
        });

        // shield deflect
        this.physics.add.overlap(this.player, this.bullet, (p, b) => {
            if(shift.isDown && p.isShielding && !p.gotHit){
                b.caught = true;
                b.rotation = p.rotation;
                b.setVelocity(0);
                shift.once('up', () => {
                    this.physics.moveTo(b, p.pointer.x, p.pointer.y, VELOCITY);
                    p.launched = true;
                    b.caught = false;
                });
            }
            else if(!p.launched && !p.invuln){
                p.takeHit();
            }
        });

        // mudthrow
        this.physics.add.collider(this.mudthrower, this.bullet, (m, b) => {
            if(b.body.touching.left){
                m.play('throw', true);
                b.x = m.x + m.displayWidth/2;
                b.y = m.y;
                b.setVelocity(0);
                m.body.checkCollision.none = true;
                this.time.delayedCall(100, () => { 
                    b.setVelocity(VELOCITY, 0);
                });
                this.time.delayedCall(200, () => { 
                    m.body.checkCollision.none = false;
                });
            }
            else{
                m.setAlpha(0);
                m.body.enable = false;
                this.time.delayedCall(5000, () => { 
                    m.setAlpha(1);
                    m.body.enable = true;
                });
            }
        });
        this.physics.add.collider(this.mudthrower, this.player, (m, p) => {
            if(p.isDashing){
                m.setAlpha(0);
                m.body.enable = false;
                this.time.delayedCall(5000, () => { 
                    m.setAlpha(1);
                    m.body.enable = true;
                });
            }
        });

        // projectile
        this.physics.add.collider(this.foundation, this.bullet);
    }
}
