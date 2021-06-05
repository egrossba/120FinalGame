class NewspaperAccess extends Phaser.Scene {
    constructor() {
        super('newspaperAccessScene');
    }

    create(){
        this.newsList = this.add.group();
        for(let i = 0; i < newsAccess.length; i++){
        if(newsAccess[i]){
            this.newsList.add(this.add.sprite(game.config.width/2 + 210*i, game.config.height/2, newsIssue[i]).setScale(0.095).setAlpha(1));
        }
    }
    }
}