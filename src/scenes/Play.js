class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.scene.launch('hudScene');
        this.layer = this.add.layer();

        // create keys, world settings, anims, sounds
        this.begin();

        // create tilemap level, gameobjects
        this.makeObjects();

        // add physics colliders
        this.setColliders();

        // camera
        this.cameras.main.startFollow(player);
        this.events.on('pause', () => {
            this.cameras.main.setAlpha(0.75);
            this.runningSound.stop();
            this.flyriderSound.stop();
            this.bgm.setVolume(0.05);
        });
        this.events.on('resume', () => {
            this.cameras.main.setAlpha(1);
            this.bgm.setVolume(0.2);
        });

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
            this.runningSound.stop();
            this.bgm.stop();
            levelNum++;
            if(levelNum >= levelMap.length){
                this.cameras.main.fadeOut(1000);
                levelNum = 0;
                this.scene.stop('hudScene');
                this.scene.start('menuScene');
            }
            else{
                this.cameras.main.fadeOut(1000);
                this.scene.start();
            }
        }

        if(levelNum == 8){
            if(this.mudPath.contains(player.x, player.y)){
                this.scene.stop();
                this.scene.stop('hudScene');
                this.runningSound.stop();
                this.bgm.stop();
                levelNum = 8;
                this.scene.start('endScene');
            }
            else if(this.clayPath.contains(player.x, player.y)){
                this.scene.stop();
                this.scene.stop('hudScene');
                this.runningSound.stop();
                this.bgm.stop();
                levelNum = 10;
                this.scene.start('endScene');
            }
        }
    }

    begin(){
        this.physics.world.setBounds(0, 0, 1920, 1920);
        this.physics.world.gravity.y = GRAVITY;
        this.physics.world.TILE_BIAS = 48;
        this.layer = this.add.layer();

        this.anims.createFromAseprite('MC-idle');
        this.anims.createFromAseprite('mudthrower-throw');
        this.anims.createFromAseprite('breakable');
        this.anims.createFromAseprite('breakablev');
        this.anims.createFromAseprite('speechbubble');
        this.anims.createFromAseprite('heart');
        this.anims.createFromAseprite('fly');
        this.anims.createFromAseprite('mudclub');

        //sfx
        this.dashSound = this.sound.add('dash', {volume: 0.2});
        this.shieldSound = this.sound.add('shield', {volume: 0.1});
        this.destroySound = this.sound.add('destroy', {volume: 3});
        this.landingSound = this.sound.add('landing', {volume: 0.2});
        this.runningSound = this.sound.add('running', {volume: 0.75, loop: true});
        this.throwSound = this.sound.add('throw', {volume: 0.2});
        this.bounceSound = this.sound.add('bounce', {volume: 0.05});
        this.flyriderSound = this.sound.add('flyrider', {volume: 0.01, loop: true});
        this.slapSound = this.sound.add('slap', {volume: 0.1, loop: true, delay: 840});
        this.hitSound = this.sound.add('hitplayer', {volume: 0.2});
        this.bgm = this.sound.add('bgm', {volume: 0.2, loop: true});
        this.bgm.play();

        // keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    }

    makeObjects(){
        // background
        this.bg1 = this.add.sprite(game.config.width/2, game.config.height, 'bg1').setScale(2);
        this.bg2 = this.add.sprite(this.bg1.x + this.bg1.displayWidth, game.config.height, 'bg2').setScale(2);
        this.layer.add(this.bg1);
        this.layer.add(this.bg2);

        // tilemaps
        const level = this.add.tilemap(levelMap[levelNum]);
        const tileset = level.addTilesetImage('tilemap', 'tilesheet');

        this.groundLayer = level.createLayer('Ground', tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({
            collides: true
        });
        this.layer.add(this.groundLayer);

        // hazards
        this.hazardLayer = level.createLayer('hazards', tileset, 0, 0);
        this.hazardLayer.setCollisionByProperty({
            collides: true
        });
        this.layer.add(this.hazardLayer);

        // rooms
        this.rooms = level.createFromObjects('Objects', [
            {
                name: 'room',
                classType: Room
            }
        ]);
        this.rooms.map((obj) => {
            obj.init();
        });
        this.roomGroup = this.add.group(this.rooms);
        this.layer.add(this.roomGroup.getChildren());

        // spawn point, end point
        this.spawn = level.findObject('Objects', obj => obj.name === 'spawn');
        const endlvl = level.findObject('Objects', obj => obj.name === 'endlvl');
        this.endTrigger = new Phaser.Geom.Rectangle(endlvl.x, endlvl.y, endlvl.width, endlvl.height);

        const mudP = level.findObject('Objects', obj => obj.name === 'goodend');
        const clayP = level.findObject('Objects', obj => obj.name === 'badend');
        this.mudPath = new Phaser.Geom.Rectangle(mudP.x, mudP.y, mudP.width, mudP.height);
        this.clayPath = new Phaser.Geom.Rectangle(clayP.x, clayP.y, clayP.width, clayP.height);

        // founds
        this.founds = level.createFromObjects('Objects', [
            {
                name: 'foundation',
                classType: Destructable
            }
        ]);
        this.founds.map((obj) => {
            obj.init();
        });
        this.foundsGroup = this.add.group(this.founds);
        this.layer.add(this.foundsGroup.getChildren());

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
        this.layer.add(this.enemyGroup.getChildren());

        // flies
        this.flies = level.createFromObjects('Objects', [
            {
                name: 'fly',
                classType: Fly,
                key: 'fly'
            }
        ]);
        this.flies.map((obj) => {
            obj.init();
        });
        this.fliesGroup = this.add.group(this.flies);
        this.fliesGroup.runChildUpdate = true;
        this.layer.add(this.fliesGroup.getChildren());

        // slappers
        this.slappers = level.createFromObjects('Objects', [
            {
                name: 'slapper',
                classType: Slapper,
                key: 'mudclub'
            }
        ]);
        this.slappers.map((obj) => {
            obj.init();
        });
        this.slapGroup = this.add.group(this.slappers);
        this.slapGroup.runChildUpdate = true;
        this.layer.add(this.slapGroup.getChildren());

        // newspaper
        this.newspapers = level.createFromObjects('Objects', [
            {
                name: 'newspaper',
                classType: Newspaper,
                key: 'newsObj'
            }
        ]);
        this.newspapers.map((obj) => {
            obj.init();
        });
        this.newspaper = this.add.group(this.newspapers);
        this.layer.add(this.newspaper.getChildren());

        // elder
        this.elders = level.createFromObjects('Objects', [
            {
                name: 'oldman',
                classType: Elder,
                key: 'oldie'
            }
        ]);
        this.elders.map((obj) => {
            obj.init();
            this.layer.add(obj.bubble);
            this.layer.add(obj.msg);
        });
        this.elder = this.add.group(this.elders);
        this.elder.runChildUpdate = true;
        this.layer.add(this.elder.getChildren());
        
        // gameobjects
        this.healthPacks = this.add.group();
        this.healthPacks.runChildUpdate = true;
        player = new Player(this, this.spawn.x, this.spawn.y, 'MC-idle');

        // init game objects
        player.init();

        // layer
        this.layer.add(this.healthPacks.getChildren());
        this.layer.add(player);
        this.layer.add(this.ballGroup.getChildren());
    }

    setColliders(){
        // dash destroy
        this.physics.add.collider(player, this.foundsGroup, (p, f) => {
            if(p.isDashing){
                f.break();
            }
        });

        // shield deflect
        this.physics.add.overlap(player, this.ballGroup, (p, b) => {
            if(shift.isDown && p.isShielding && !p.gotHit){
                b.caught = true;
                b.rics = 0;
                b.rotation = p.rotation;
                b.setVelocity(0);
                shift.once('up', () => {
                    this.throwSound.play();
                    this.physics.moveTo(b, p.pointer.worldX, p.pointer.worldY, VELOCITY);
                    p.launched = true;
                    b.caught = false;
                    b.wasThrown = true;
                });
            }
            else{
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
                b.wasThrown = false;
                b.rics = 0;
            }
            else{
                m.takeHit();
            }
        });
        this.physics.add.collider(this.enemyGroup, player, (m, p) => {
            if(p.isDashing){
                m.takeHit();
            }
            else{
                p.takeHit();
            }
        });

        // projectile
        this.physics.add.collider(this.foundsGroup, this.ballGroup, (f, b) => {
            if(Phaser.Math.Distance.Between(player.x, player.y, b.x, b.y) < 700){
                this.bounceSound.play();
            }
            if(b.wasThrown){
                b.rics++;
            }
        });

        // ground
        this.physics.add.collider(player, this.groundLayer);
        this.physics.add.collider(this.ballGroup, this.groundLayer, (b, g) => {
            if(Phaser.Math.Distance.Between(player.x, player.y, b.x, b.y) < 700){
                this.bounceSound.play();
            }
            if(b.wasThrown){
                b.rics++;
            }
        });

        // newspapers
        this.physics.add.overlap(player, this.newspaper, (p, n) => {
            this.runningSound.stop();
            n.body.enable = false;
            n.setAlpha(0.5);
            this.cameras.main.setAlpha(0.75);
            this.scene.pause();
            this.scene.launch("readScene");
            n.setAlpha(0);
        });

        // flies
        this.physics.add.collider(this.fliesGroup, player, (f, p) => {
            if(p.isDashing){
                f.takeHit();
            }
            else{
                p.takeHit();
            }
        });
        this.physics.add.overlap(this.fliesGroup, this.ballGroup, (f, b) => {
            if(b.wasThrown){
                f.takeHit();
            }
        });

        // slappers
        this.physics.add.collider(this.slapGroup, player, (s, p) => {
            if(p.isDashing){
                s.takeHit();
            }
            else{
                p.takeHit()
            }
        });
        this.physics.add.overlap(this.slapGroup, this.ballGroup, (s, b) => {
            if(b.wasThrown){
                s.takeHit();
            }
        });

        // health packs
        this.physics.add.overlap(this.healthPacks, player, (h, p) => {
            if(h.isAble && playerHealth < maxHealth){
                h.destroy();
                p.gainHealth();
            }
        });
        this.physics.add.collider(this.healthPacks, this.foundsGroup);
        this.physics.add.collider(this.healthPacks, this.groundLayer);
        this.physics.add.collider(this.healthPacks, this.hazardLayer);

        // hazards
        this.physics.add.collider(player, this.hazardLayer, (p, h) =>{
            p.takeHit();
        });
        this.physics.add.collider(this.ballGroup, this.hazardLayer, (b, h) => {
            if(Phaser.Math.Distance.Between(player.x, player.y, b.x, b.y) < 700){
                this.bounceSound.play();
            }
            if(b.wasThrown){
                b.rics++;
            }
        });

        // elder
        this.physics.add.overlap(player, this.elder, (p, e) =>{
            e.talk();
        });
    }
}
