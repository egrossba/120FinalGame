class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.atlas('monster_atlas', 'monster_sheet.png', 'monster_sheet.json');
        this.load.image('groundScroll', 'ground.png');
        this.load.image('talltrees', 'talltrees.png');
        this.load.image('side', 'side.png');
        this.load.image('sidealt', 'sidealt.png');
        this.load.image('bunny', 'bunny.png');
        this.load.image('butlerGlowDown', 'lowbouncer.png');
        this.load.image('butlerGlowUp', 'highbouncer.png');
        this.load.image('backgroundStuff', 'BGNEW2.png');
        this.load.image('chandelier', 'chandelier.png');
        this.load.image('mirror', 'mirror.png');
        this.load.image('sun', 'sun.png');
        this.load.image('heart', 'heart.png');
        this.load.image('eyes', 'eyes.png');
        this.load.image('tea', 'tea.png');
        this.load.image('hang', 'hang.png');
        this.load.image('alt_highscore_text', 'alt_highscore_text.png');
        this.load.image('alt_restart_text', 'alt_restart_text.png');
        this.load.image('alt_start_text', 'alt_start_text.png');
        this.load.image('alt_tutorial_text', 'alt_tutorial_text.png');
        this.load.image('nooo', 'nooo.png');
        this.load.image('Rebound', 'Rebound_Title.png');
        this.load.image('tutorialA', 'tutorialA.png');
        this.load.image('tutorialS', 'tutorialS.png');
        this.load.image('tutorialD', 'tutorialD.png');
        this.load.image('tutorialW', 'tutorialW.png');
        this.load.image('tutorialMove', 'tutorialMove2.png');
        this.load.image('tutorialM', 'tutorialM.png');

        this.load.audio('bgm', 'bgm.wav');
        this.load.audio('bunnyjump', 'bunnyjump.wav');
        this.load.audio('hit', 'hit.wav');
        this.load.audio('startGame', 'startGame.wav');
        this.load.audio('formChange', 'formChange.wav');
        this.load.audio('lose', 'lose.wav');
    }

    create() {
        // camera pan backgrounds
        for(let i = 0; i < 12; i++){
            this.add.sprite(0, game.config.height*i, 'backgroundStuff').setOrigin(0).setScale(SCALE);
        }

        // tutorial slides
        let slides = ['tutorialMove', 'tutorialW', 'tutorialS', 'tutorialA', 'tutorialD', 'tutorialM'];
        for(let i = 1; i < 7; i++){
            this.add.sprite(game.config.width * i, 0, 'backgroundStuff').setOrigin(0).setScale(SCALE);
            this.add.sprite(game.config.width*(2*i + 1)/2, game.config.height/2, slides[i-1]).setScale(SCALE*6/5);
        }
        this.pos = 0;

        // main menu
        this.add.sprite(game.config.width/2 - 17, game.config.height/3, 'Rebound').setScale(SCALE/3);
        this.add.sprite(game.config.width/2, game.config.height/2, 'alt_start_text').setScale(SCALE);
        this.add.sprite(game.config.width/2, game.config.height/5*3, 'alt_tutorial_text').setScale(SCALE);

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    }

    update() {
        if(this.pos == 0 && Phaser.Input.Keyboard.JustDown(spacebar)){
            this.sound.play('startGame');
            this.cameras.main.pan(game.config.width/2, game.config.height*11.5, 2000, 'Power2');
            this.time.delayedCall(2000, () => { 
                this.scene.start('playScene');
            });
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            if(this.pos == 0){
                this.cameras.main.pan(game.config.width*3/2, game.config.height/2, 500, 'Power2');
                this.pos++;
            }
            else if(this.pos == 1){
                this.cameras.main.pan(game.config.width*5/2, game.config.height/2, 500, 'Power2');
                this.pos++;
            }
            else if(this.pos == 2){
                this.cameras.main.pan(game.config.width*7/2, game.config.height/2, 500, 'Power2');
                this.pos++;
            }
            else if(this.pos == 3){
                this.cameras.main.pan(game.config.width*9/2, game.config.height/2, 500, 'Power2');
                this.pos++;
            }
            else if(this.pos == 4){
                this.cameras.main.pan(game.config.width*11/2, game.config.height/2, 500, 'Power2');
                this.pos++;
            }
            else if(this.pos == 5){
                this.cameras.main.pan(game.config.width*13/2, game.config.height/2, 500, 'Power2');
                this.pos++;
            }
            else if(this.pos == 6){
                this.cameras.main.pan(game.config.width/2, game.config.height/2, 500, 'Power2');
                this.pos = 0;
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyA)){
            if(this.pos == 1){
                this.cameras.main.pan(game.config.width/2, game.config.height/2, 500, 'Power2');
                this.pos--;
            }
            else if(this.pos == 2){
                this.cameras.main.pan(game.config.width*3/2, game.config.height/2, 500, 'Power2');
                this.pos--;
            }
            else if(this.pos == 3){
                this.cameras.main.pan(game.config.width*5/2, game.config.height/2, 500, 'Power2');
                this.pos--;
            }
            else if(this.pos == 4){
                this.cameras.main.pan(game.config.width*7/2, game.config.height/2, 500, 'Power2');
                this.pos--;
            }
            else if(this.pos == 5){
                this.cameras.main.pan(game.config.width*9/2, game.config.height/2, 500, 'Power2');
                this.pos--;
            }
            else if(this.pos == 6){
                this.cameras.main.pan(game.config.width*11/2, game.config.height/2, 500, 'Power2');
                this.pos--;
            }
        }
    }
}