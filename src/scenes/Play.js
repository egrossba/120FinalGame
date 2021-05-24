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
        this.landingSound = this.sound.add('landing', {volume: 0.2});
        this.runningSound = this.sound.add('running', {volume: 0.5, loop: true});
        this.throwSound = this.sound.add('throw', {volume: 0.2});


        // keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // tilemaps
        const testMap = this.add.tilemap('testscene');
        const tileset = testMap.addTilesetImage('tilemap', 'tilesheet');
        this.groundLayer = testMap.createLayer('Ground', tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({
            collides: true
        });
        const spawn = testMap.findObject('Objects', obj => obj.name === 'spawn');
        this.enemies = testMap.createFromObjects('Objects', [
            {
                name: 'enemy',
                classType: Enemy,
                key: 'mudthrower-throw',
                frame: '0'
            }
        ]);
        this.enemies.map((obj) => {
            obj.init();
        });
        this.enemyGroup = this.add.group(this.enemies);
        this.enemyGroup.runChildUpdate = true;
        this.founds = testMap.createFromObjects('Objects', [
            {
                name: 'foundation',
                classType: Destructable,
                key: 'breakable',
                frame: '0'
            }
        ]);
        this.founds.map((obj) => {
            obj.init();
        });
        this.foundsGroup = this.add.group(this.founds);
        
        // gameobjects
        this.player = new Player(this, spawn.x, spawn.y, 'MC-idle', 'Sprite-0003-Recovered1');
        this.bullet = new Projectile(this, game.config.width*2/3, game.config.height*2/3, 'clayball');
        
        // init game objects
        this.player.init();
        this.bullet.init();

        // layer
        // let objects = [this.player, this.foundation, this.mudthrower, this.bullet];
        // this.layer.add(objects);

        // camera
        this.cameras.main.startFollow(this.player);

        // add physics colliders
        this.setColliders();
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

    setColliders(){
        // dash destroy
        this.physics.add.collider(this.player, this.foundsGroup, (p, f) => {
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
                    this.throwSound.play();
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
        this.physics.add.collider(this.enemyGroup, this.bullet, (m, b) => {
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
        this.physics.add.collider(this.enemyGroup, this.player, (m, p) => {
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
        this.physics.add.collider(this.foundsGroup, this.bullet);

        // ground
        this.physics.add.collider(this.player, this.groundLayer);
    }
}
