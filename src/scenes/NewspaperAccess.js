class NewspaperAccess extends Phaser.Scene {
    constructor() {
        super('newspaperAccessScene');
    }

    create(){
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
                    n = this.add.sprite(120 + game.config.width*i/4, game.config.height*2/3, newsIssue[i]).setScale(0.075).setOrigin(0.5);
                }
                n.setInteractive()
                .on('pointerover', () => {
                    n.setTint(0x955FEF);
                }) // change pointer colours
                .on('pointerout', () => {
                    n.setTint(0xFFFFFF);
                })
                .on('pointerdown', () => {
                    
                });
            }
        }
    }
}