class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // create keys, world settings, anims, sounds
        this.begin();

        // create tilemap level, gameobjects
        this.makeObjects();

        // add physics colliders
        this.setColliders();

        // layer
        let objects = [player];
        this.layer.add(objects);

        // camera
        this.cameras.main.startFollow(player);

        // pause menu
        esc.on('down', () => {
            this.scene.pause();
            this.scene.launch('pauseScene');
        });
    }

    update() {
        // combos
        wCombo = keyW.isDown && !keyA.isDown && !keyD.isDown && !keyS.isDown;
        sCombo = !keyW.isDown && !keyA.isDown && !keyD.isDown && keyS.isDown;
        aCombo = !keyW.isDown && keyA.isDown && !keyD.isDown && !keyS.isDown;
        dCombo = !keyW.isDown && !keyA.isDown && keyD.isDown && !keyS.isDown;
        wdCombo = keyW.isDown && !keyA.isDown && keyD.isDown && !keyS.isDown;
        waCombo = keyW.isDown && keyA.isDown && !keyD.isDown && !keyS.isDown;
        sdCombo = !keyW.isDown && !keyA.isDown && keyD.isDown && keyS.isDown;
        saCombo = !keyW.isDown && keyA.isDown && !keyD.isDown && keyS.isDown;
        validCombo = wCombo || sCombo || aCombo || dCombo || wdCombo || waCombo || sdCombo || saCombo;
        
        // move player
        player.update();

        // end level
        if(this.endTrigger.contains(player.x, player.y) || Phaser.Input.Keyboard.JustDown(keyL)){
            this.scene.stop();
            levelNum++;
            if(levelNum >= levelMap.length){
                this.scene.start('menuScene');
            }
            else{
                this.scene.start();
            }
        }
    }

    makeObjects(){
        // tilemaps
        const level = this.add.tilemap(levelMap[levelNum]);
        const tileset = level.addTilesetImage('tilemap', 'tilesheet');
        this.groundLayer = level.createLayer('Ground', tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({
            collides: true
        });
        // spawn point, end point
        const spawn = level.findObject('Objects', obj => obj.name === 'spawn');
        const endlvl = level.findObject('Objects', obj => obj.name === 'endlvl');
        this.endTrigger = new Phaser.Geom.Rectangle(endlvl.x, endlvl.y, endlvl.width, endlvl.height);
        // throwers
        this.throwers = level.createFromObjects('Objects', [
            {
                name: 'thrower',
                classType: Enemy,
                key: 'mudthrower-throw',
                frame: '0'
            }
        ]);
        this.ballGroup = this.add.group();
        this.ballGroup.runChildUpdate = true;
        this.throwers.map((obj) => {
            obj.init();
            let xMul;
            obj.flipX ? xMul = -1 : xMul = 1;
            let ball = new Projectile(this, obj.x + xMul*obj.displayWidth/2, obj.y, 'clayball');
            ball.init();
            this.ballGroup.add(ball);
        });
        this.enemyGroup = this.add.group(this.throwers);
        this.enemyGroup.runChildUpdate = true;
        // founds
        this.founds = level.createFromObjects('Objects', [
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
        player = new Player(this, spawn.x, spawn.y, 'MC-idle', 'Sprite-0003-Recovered1');
        //this.newspaper = new Newspaper(this, 533, 327, 'bunny');

        // init game objects
        player.init();
        //this.newspaper.init();
    }

    begin(){
        this.physics.world.setBounds(0, 0, 1920, 1920);
        this.physics.world.gravity.y = GRAVITY;
        this.physics.world.TILE_BIAS = 48;
        this.layer = this.add.layer();

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
        this.bounceSound = this.sound.add('bounce', {volume: 0.2});

        // keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    }

    setColliders(){
        // dash destroy
        this.physics.add.collider(player, this.foundsGroup, (p, f) => {
            if(p.isDashing){
                this.cameras.main.shake(100, 0.01);
                f.body.enable = false;
                f.play('die');
                this.destroySound.play();
                p.dashes++;
                p.shields++;
            }
        });

        // shield deflect
        this.physics.add.overlap(player, this.ballGroup, (p, b) => {
            if(shift.isDown && p.isShielding && !p.gotHit){
                b.caught = true;
                b.rotation = p.rotation;
                b.setVelocity(0);
                shift.once('up', () => {
                    this.throwSound.play();
                    this.physics.moveTo(b, p.pointer.worldX, p.pointer.worldY, VELOCITY);
                    p.launched = true;
                    b.caught = false;
                });
            }
            else if(!p.launched && !p.invuln){
                p.takeHit();
            }
        });

        // mudthrow
        this.physics.add.collider(this.enemyGroup, this.ballGroup, (m, b) => {
            if((b.body.touching.left && m.flipX == false) ||
                (b.body.touching.right && m.flipX == true)){
                m.play('throw', true);
                let xMul;
                m.flipX ? xMul = -1 : xMul = 1;
                b.x = m.x + xMul*m.displayWidth/2;
                b.y = m.y;
                b.setVelocity(0);
                m.body.checkCollision.none = true;
                this.time.delayedCall(100, () => { 
                    b.setVelocity(xMul*VELOCITY, 0);
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
        this.physics.add.collider(this.enemyGroup, player, (m, p) => {
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
        this.physics.add.collider(this.foundsGroup, this.ballGroup, (f, b) => {
            if(Phaser.Math.Distance.Between(player.x, player.y, b.x, b.y) < 700){
                this.bounceSound.play();
            }
        });

        // ground
        this.physics.add.collider(player, this.groundLayer);
        this.physics.add.collider(this.ballGroup, this.groundLayer, (b, g) => {
            if(Phaser.Math.Distance.Between(player.x, player.y, b.x, b.y) < 700){
                this.bounceSound.play();
            }
        });
    }
}
