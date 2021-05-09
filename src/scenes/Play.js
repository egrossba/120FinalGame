class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.layer = this.add.layer();

        this.physics.world.gravity.y = GRAVITY;
        this.scrollSpeed = 3;
        this.bonusFactor = 1;
        this.obsVel = VELOCITY/2;

        // set bg
        this.mansion = this.add.tileSprite(0, 0, 0, 0, 'backgroundStuff').setOrigin(0).setScale(SCALE);

        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        });

        this.time.delayedCall(500, () => { 
            this.bgm.play();
        });

        // platform and character
        this.player = new Platform(this, game.config.width/2, game.config.height/2, 'butlerGlowUp');
        this.character = new Character(this, game.config.width/2, 0, 'bunny');
        this.monster = new Monster(this, game.config.width/2, game.config.height - 85, 'monster_atlas', 'Timeline 2_0000');
        this.player.init();
        this.character.init();
        this.monster.init();

        // obstacles
        this.obstacles = this.physics.add.group({runChildUpdate: true});
        this.time.delayedCall(3000, () => { 
            this.addObstacle(); 
        });

        this.obsKeys = ['chandelier', 'mirror', 'sun', 'heart', 'eyes', 'tea', 'hang'];

        // layer
        let objects = [this.mansion, this.player, this.character, this.monster];
        this.layer.add(objects);

        // keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // add physics colliders
        this.physics.add.overlap(this.character, this.player, (c, p) => {
            // bounce character off platform
            if(p.body.touching.up && !c.body.touching.up){
                c.bounce();
                this.sound.play('bunnyjump');
            }
        });
        this.physics.add.collider(this.character, this.obstacles, (c, o) => {
            if(o.body.touching.down && c.body.touching.up){
                c.setVelocityY(VELOCITY);
                if(this.player.y < c.y + c.displayHeight/2 + this.player.displayHeight){
                    // failsafe for cloud collision bug, ty Adam Smith
                    c.y = this.player.y + this.player.displayHeight;
                }
            }
            this.sound.play('hit');
        });
        this.physics.add.overlap(this.character, this.monster, this.gameOver, null, this);

        // gameover bool
        this.youLost = false;

        // score
        this.score = 0;
        this.highScore = 0;

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#FF0000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreText = this.add.text(game.config.width - this.scoreConfig.fixedWidth - borderPadding, 
            borderPadding, this.score, this.scoreConfig);

        this.incScore = this.time.addEvent({ delay: 100, callback: this.tickScore, callbackScope: this, loop: true });

    }

    update() {
        if(this.youLost && Phaser.Input.Keyboard.JustDown(spacebar)){
            this.sound.stopAll();
            this.sound.play('startGame');
            this.scene.restart();
        }

        this.mansion.tilePositionY -= this.scrollSpeed;

        // match monster with character
        this.monster.x = this.character.x;

        // move player and obstacles
        this.player.update();
        this.monster.update();

        // rotate character
        this.character.angle += this.character.body.velocity.x/100;

        // switch forms
        if(Phaser.Input.Keyboard.JustDown(keyA)) {
            this.sound.play('formChange');
            this.character.mode = 'left';
            this.player.mode = 'left';
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)) {
            this.sound.play('formChange');
            this.character.mode = 'up';   
            this.player.mode = 'up';       
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('formChange');
            this.character.mode = 'down'; 
            this.player.mode = 'down';       
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            this.sound.play('formChange');
            this.character.mode = 'right';   
            this.player.mode = 'right';     
        }

        // increase difficulty
        if(this.score != 0 && this.score < 1000 && this.score % 100 == 0){
            this.obsVel += this.bonusFactor/50;
            this.scrollSpeed += 0.02;
            this.bonusFactor++;
        }
    }

    gameOver(){
        this.sound.play('lose');
        this.cameras.main.shake(100, 0.01);
        this.scrollSpeed = 0;
        this.youLost = true;

        this.bgm.stop();
        this.monster.anims.stop();
        this.character.setAlpha(0);
        this.character.body.enable = false;

        // check for high score in local storage
        if(localStorage.getItem('highScore') != null) {
            let storedScore = parseInt(localStorage.getItem('highScore'));
            // see if current score is higher than stored score
            if(this.score > storedScore) {
                localStorage.setItem('highScore', this.score.toString());
                this.highScore = this.score;
            } else {
                this.highScore = parseInt(localStorage.getItem('highScore'));
            }
        } else {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
        }

        let loserConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            backgroundColor: '#FFFFFF',
            color: '#DC143C',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 120
        }

        this.add.sprite(game.config.width/2, game.config.height/3, 'nooo').setScale(SCALE/3);
        this.add.sprite(game.config.width/3 + 15, game.config.height/2, 'alt_highscore_text').setScale(SCALE);
        this.add.sprite(game.config.width/2, game.config.height*3/5, 'alt_restart_text').setScale(SCALE);


        this.hScoreText = this.add.text(game.config.width*2/3 - 15, game.config.height/2, this.highScore, loserConfig).setOrigin(0.5);
    }

    tickScore() {
        // update score
        if(!this.youLost){
            this.score += 1;
            this.scoreText.text = this.score;
        }
    }

    addObstacle(){
        if(!this.youLost){
            let obs = new Obstacle(this, game.config.width/2, -game.config.height/2, this.obsKeys[Math.floor(Math.random() * this.obsKeys.length)]).setScale(SCALE/10);
            this.obstacles.add(obs);
            obs.init(this.obsVel);
            this.layer.addAt(obs, 1);
        }
    }
}
