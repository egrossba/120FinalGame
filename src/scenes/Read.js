class Read extends Phaser.Scene {
    constructor() {
        super('readScene');
    }

    init(data){
        this.newspaperText = data.newspaperText;
    }
    create() {
        this.scenes = game.scene.getScenes(false);
        
        this.add.sprite(0,0,"bunny");
        this.add.text(0,0, this.newspaperText);
        // space to close bunny
        this.input.keyboard.once('keydown-SPACE', () => this.unpause());
    }

    unpause() {
        this.scene.stop();
        this.scenes.forEach((s) => {
            if(this.scene.isPaused(s)){
                this.scene.resume(s);
            }
        });
    }
}