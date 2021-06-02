class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.image('talltrees', 'talltrees.png');
        this.load.image('agent', 'MC1.png');
        this.load.image('agent2', 'MC2.png');
        this.load.image('mudthrower1', 'mudthrower1.png');
        this.load.image('mudthrower2', 'mudthrower2.png');
        this.load.image('mudthrower3', 'mudthrower3.png');
        this.load.image('clayball', 'clayball.png');
        this.load.image('bunny', 'bunny.png');
        this.load.image('title', 'DownbringerTitle.png');
        this.load.image('button', 'MainMenu-02.png');
        this.load.image('start', 'StartText.png');
        this.load.image('tutorial', 'TutorialText.png');
        this.load.image('credits', 'CreditsText.png');
        this.load.image('back', 'BackText.png');
        this.load.image('menu', 'MenuText.png');
        this.load.image('resume', 'ResumeText.png');
        this.load.image('credsStuff', 'CreditsStuff.png');
        this.load.image('newspaper', 'tempNewsObj.png');
        this.load.image('news', 'tempNews.png');

        this.load.audio('dash', 'shortdash.wav');
        this.load.audio('shield', 'shield2.wav');
        this.load.audio('destroy', 'destroy3.wav');
        this.load.audio('landing', 'landing.wav');
        this.load.audio('running', 'running.wav');
        this.load.audio('throw', 'throw.wav');
        this.load.audio('bounce', 'mudbounce.wav');

        this.load.aseprite('MC-idle', 'MC-idle.png', 'MC-idle.json');
        this.load.aseprite('mudthrower-throw', 'mudthrower-throw.png', 'mudthrower-throw.json');
        this.load.aseprite('breakable', 'breakableplatform.png', 'breakableplatform.json');
    
        this.load.image("tilesheet", "tilemap.png");    // tile sheet
        this.load.tilemapTiledJSON("LVL1", "lvl1 48.json");    // Tiled JSON file
        this.load.tilemapTiledJSON("LVL2", "LVL2 48.json");
        this.load.tilemapTiledJSON("LVL3", "lvl3 48.json");
        this.load.tilemapTiledJSON("LVL4", "lvl4 48.json");
        this.load.tilemapTiledJSON("LVL5", "lvl5 48.json");
    }

    create() {
        this.cameras.main.fadeIn(1000);

        levelNum = 0;
        this.pos = 0;
        
        for(let i = -1; i < 3; i++){
            this.add.sprite(game.config.width*i, 0, 'title').setOrigin(0).setScale(.9);
        }
        this.add.sprite(game.config.width*-0.5, game.config.height*3/5, 'credsStuff').setOrigin(0.5).setScale(0.25);
        
        // BUTTONS
        this.setButtons();
        
        // TUTORIAL SECTION
        this.runTutorial();
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
        if(this.pos == 1){
            player.update();
            this.ball.update();
            this.mudthrower.update();
        }
    }

    setColliders(){
        // dash destroy
        this.physics.add.collider(player, this.foundation, (p, f) => {
            if(p.isDashing){
                this.cameras.main.shake(100, 0.01);
                f.body.enable = false;
                f.play('die');
                this.destroySound.play();
                p.dashes++;
                p.shields++;
                this.time.delayedCall(5000, () => { 
                    f.setFrame('0');
                    f.body.enable = true;
                });
            }
        });

        // shield deflect
        this.physics.add.overlap(player, this.ball, (p, b) => {
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
        this.physics.add.collider(this.mudthrower, this.ball, (m, b) => {
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
        this.physics.add.collider(this.mudthrower, player, (m, p) => {
            if(p.isDashing){
                m.setAlpha(0);
                m.body.enable = false;
                this.time.delayedCall(5000, () => { 
                    m.setAlpha(1);
                    m.body.enable = true;
                });
            }
        });

        this.physics.add.collider(this.foundation, this.ball);
    }

    setButtons(){
        // start
        this.startBut = this.add.sprite(game.config.width/2, game.config.height*3/7, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.startBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.startBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            this.cameras.main.fadeOut(1000);
            this.scene.start('playScene');
        });
        this.startText = this.add.sprite(game.config.width/2, game.config.height*3/7, 'start').setOrigin(.5).setScale(.25);
        
        // tutorial
        this.tutorialBut = this.add.sprite(game.config.width/2, game.config.height*4/7, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.tutorialBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.tutorialBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            this.cameras.main.pan(game.config.width*3/2, game.config.height/2, 500, 'Power2');
            this.pos++;
        });
        this.tutText = this.add.sprite(game.config.width/2, game.config.height*4/7, 'tutorial').setOrigin(.5).setScale(.25);
        
        this.tutBackBut = this.add.sprite(game.config.width*10/9, game.config.height*1/6, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.tutBackBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.tutBackBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            this.cameras.main.pan(game.config.width/2, game.config.height/2, 500, 'Power2');
            this.pos--;
        });
        this.tutBackText = this.add.sprite(game.config.width*10/9, game.config.height*1/6, 'back').setOrigin(.5).setScale(.25);

        // credits
        this.credsBut = this.add.sprite(game.config.width/2, game.config.height*5/7, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.credsBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.credsBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            this.cameras.main.pan(game.config.width/-2, game.config.height/2, 500, 'Power2');
            this.pos--;
        });
        this.credsText = this.add.sprite(game.config.width/2, game.config.height*5/7, 'credits').setOrigin(.5).setScale(.25);

        this.credsBackBut = this.add.sprite(game.config.width*-1/9, game.config.height*1/6, 'button').setOrigin(.5).setScale(.25).setInteractive()
        .on('pointerover', () => {
            this.credsBackBut.setTint(0x955FEF);
        })
        .on('pointerout', () => {
            this.credsBackBut.setTint(0xFFFFFF);
        })
        .on('pointerdown', () => {
            this.cameras.main.pan(game.config.width/2, game.config.height/2, 500, 'Power2');
            this.pos++;
        });
        this.credsBackText = this.add.sprite(game.config.width*-1/9, game.config.height*1/6, 'back').setOrigin(.5).setScale(.25);
    }

    runTutorial(){
        this.physics.world.setBounds(840, 0, 840, 500);
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

        // gameobjects
        player = new Player(this, game.config.width*3/2, game.config.height/2, 'MC-idle', 'Sprite-0003-Recovered1').setCollideWorldBounds(true);
        this.foundation = new Destructable(this, game.config.width*5/3, game.config.height/2, 'breakable');
        this.mudthrower = new Enemy(this, game.config.width*7/6, game.config.height - 50, 'mudthrower-throw');
        this.ball = new Projectile(this, this.mudthrower.x + this.mudthrower.displayWidth/2, this.mudthrower.y, 'clayball').setCollideWorldBounds(true);
            
        // init
        player.init();
        this.foundation.init();
        this.mudthrower.init();
        this.ball.init();
        this.foundation.setScale(0.5);

        // instructions
        this.menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }

        this.menu = this.add.text(game.config.width*6/5, game.config.height/2, 
            "AD to strafe,\nWASD + Space to dash.\nHold Shift to catch,\nMouse to aim ball,\nrelease Shift to throw.",
            this.menuConfig).setOrigin(0.5);


        // layer
        let objects = [this.menu, player, this.foundation, this.mudthrower, this.ball];
        this.layer.add(objects);

        // add physics colliders
        this.setColliders();
    }
}