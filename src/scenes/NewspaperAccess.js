class NewspaperAccess extends Phaser.Scene {
    constructor() {
        super('newspaperAccessScene');
    }

    create(){
        this.scene.bringToTop();
        this.reading = false;
        this.returnPos;

        // show up the newspaper list menu title
        this.add.sprite(game.config.width/2, 50, 'newssign').setScale(0.1).setInteractive();

        // show up the newspaper list
        this.newsList = this.add.group();
        for(let i = 0; i < newsAccess.length; i++){
            if(newsAccess[i]){
                let n;
                if(i < 4){
                    n = this.add.sprite(120 + game.config.width*i/4, game.config.height/3, newsIssue[i]).setScale(0.075).setOrigin(0.5);
                }
                else{
                    n = this.add.sprite(120 + game.config.width*(i-4)/4, game.config.height*2/3, newsIssue[i]).setScale(0.075).setOrigin(0.5);
                }
                this.newsList.add(n);
                n.setInteractive()
                .on('pointerover', () => {
                    n.setTint(0x955FEF);
                }) // change pointer colours
                .on('pointerout', () => {
                    n.setTint(0xFFFFFF);
                })
                .on('pointerdown', () => {
                    if(!this.reading){
                        this.read(n);
                    }
                    else{
                        this.close(n);
                    }
                });
            }
        }
    }

    read(n){
        this.reading = true;
        this.returnPos = new Phaser.Math.Vector2(n.x, n.y);
        this.newsList.setAlpha(0);
        n.setAlpha(1).setPosition(game.config.width/2, game.config.height/2).setScale(0.28);
        // this.tweens.add({
        //     targets: this.paper, 
        //     alpha: { from: 0, to: 1 },
        //     scale: { from: 0.1, to: 0.28 },
        //     angle: { from: 0, to: 360 },
        //     ease: 'Sine.easeInOut',
        //     duration: 500 
        // });
    }

    close(n){
        this.reading = false;
        this.newsList.setAlpha(1);
        n.setPosition(this.returnPos.x, this.returnPos.y).setScale(0.075);
    }
}