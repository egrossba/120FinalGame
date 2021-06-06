class Room extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    }
 
    init(){
        this.setScale(0.1).setTint(0x949494).setOrigin(0.5);
        this.body.immovable = true;
        this.body.allowGravity = false;
        
        let rooms = ['room1', 'room2', 'room3', 'room4'];
        this.setTexture(rooms[Math.floor(Math.random() * rooms.length)]);
    }

    update(){
        
    }
}