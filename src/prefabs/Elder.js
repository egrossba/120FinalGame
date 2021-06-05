class Elder extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
 
    init(){
        this.setScale(0.15);
        this.body.setSize();
        this.body.immovable = true;
        this.body.allowGravity = false;

        this.elderConfig = {
            fontFamily: 'Georgia',
            fontSize: '12px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'left',
            padding: {
                top: 2,
                bottom: 2,
                left: 2,
                right: 2
            },
            wordWrap: { width: 120 }
        }

        this.msg = this.scene.add.text(this.x + this.displayWidth/2, this.y - this.displayHeight, elderMsg[levelNum], this.elderConfig).setAlpha(0);
    }

    update(){
        
    }

    talk(){
        this.msg.setAlpha(1);
    }
}