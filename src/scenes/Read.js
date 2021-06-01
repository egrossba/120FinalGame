class Read extends Phaser.Scene {
    constructor() {
        super('readScene');
    }

    init(data){
        this.newspaperText = data.newspaperText;
    }
    create() {
        this.add.sprite(0,0,"bunny");
        this.add.text(0,0, this.newspaperText);
        // space to close bunny
        this.input.keyboard.once('keydown-SPACE', () => this.scene.stop());

    }
}