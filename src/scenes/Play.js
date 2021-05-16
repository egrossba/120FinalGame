class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.layer = this.add.layer();
        this.physics.world.gravity.y = GRAVITY;

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
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'agent2').setScale(0.25);
        this.foundation = new Destructable(this, game.config.width/3, game.config.height/2, 'butler');
        this.bullet = new Projectile(this, game.config.width*2/3, 0, 'clayball');
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
                p.dashesUsed--;
                p.shieldsUsed--;
                f.setAlpha(0);
                f.body.enable = false;
                this.destroySound.play();
            }
            this.time.delayedCall(5000, () => { 
                f.setAlpha(1);
                f.body.enable = true;
            });
        });

        // shield deflect

        this.physics.add.overlap(this.player, this.bullet, (p, b) => {
            if(shift.isDown && p.isShielding && !p.gotHit){
                b.x = p.x;
                b.y = p.y;
                b.rotation = p.rotation;
                b.setVelocity(0);
                shift.once('up', () => {
                    this.physics.moveTo(b, p.pointer.x, p.pointer.y, VELOCITY);
                    p.launched = true;
                });
            }
            else if(!p.launched && !p.invuln){
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
