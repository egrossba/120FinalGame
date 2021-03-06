class Destructable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        if(this.data.get('vertical')){
            this.setTexture('breakablev');
            this.setFrame('0');
        }
        else{
            this.setTexture('breakable');
            this.setFrame('0');
        }
        this.setOrigin(0.5).setScale(0.7, 0.7);
        this.body.setSize();
        this.body.allowGravity = false;
        this.body.immovable = true;
    }

    break(){
        this.scene.cameras.main.shake(100, 0.01);
        this.body.enable = false;
        if(this.data.get('vertical')){
            this.play('break');
        }
        else{
            this.play('die');
        }
        this.scene.destroySound.play();
        player.dashes++;
        player.shields++;
        this.scene.time.delayedCall(5000, () => { 
            this.setFrame('0');
            this.body.enable = true;
        });
    }
}