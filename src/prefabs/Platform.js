class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        game.input.mouse.capture = true;
    }

    init(){
        this.setScale(.12).setOrigin(0.5);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true);
        this.mode = 'up';
    }


    update() {
        this.x = game.input.mousePointer.x;
        this.y = game.input.mousePointer.y;

        this.x = Phaser.Math.Clamp(this.x, this.displayWidth/2, game.config.width - this.displayWidth/2);
        this.y = Phaser.Math.Clamp(this.y, this.displayHeight/2, game.config.height - this.displayHeight/2);

        // form changes
        switch(this.mode){
            case 'up':
                this.setTexture('butlerGlowUp');
                this.body.setSize();
                this.setFlip(false, false);
                break;
            case 'down':
                this.setTexture('butlerGlowDown');
                this.body.setSize();
                this.setFlip(false, true);
                break;
            case 'left':
                this.setTexture('sidealt');
                this.body.setSize();
                this.setFlip(true, false);
                break;
            case 'right':
                this.setTexture('sidealt');
                this.body.setSize();
                this.setFlip(false, false);
                break;
        }
    }
}
