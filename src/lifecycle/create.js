const world = require("../world");
const { width, height, cameraWidth, cameraHeight } = require("../constants");
const { Cameras } = require("phaser");

module.exports = function create() {

    // adds background image
    // this.add.image(960, 540, 'bg');

    var config = {
        key: 'idle',
        frames: this.anims.generateFrameNumbers('megamanxsprite1', {start: 5, end: 5}),
        frameRate: 20,
        repeat: -1
    };

    this.keys = {
        jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        jump2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
        fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        dash: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    };

    this.anims.create(config);

    // let megaMan = this.add.megaMan(width/2, height/2, "megamanxsprite1");
    // megaMan.displayWidth = width*.1;
    // megaMan.scaleY = megaMan.scaleX;
    // megaMan.play('idle');

    // scale test for camera
    let megaMan = this.add.megaMan(100, 800, "megamanxsprite1"); 
    megaMan.displayWidth = cameraWidth * .1; //determines player's relative size
    megaMan.scaleY = megaMan.scaleX;
    megaMan.play('idle');

    const player = megaMan
    world.player = this.physics.add.existing(player);

    // tilemap
    this.add.image(width/2,height/2,'graphics'); // temporary fix to show visuals
    var map = this.make.tilemap({ key: 'level1' });
    var tileset = map.addTilesetImage('level_tiles', 'tiles'); // isn't generating visuals like i want it to
    var platforms = map.createLayer(0, 'tiles')
    map.setCollision([ 15 ]); // 15 is the tile ID code for the platform i used
    this.physics.add.collider(player, platforms);

    // camera settings
    this.cameras.main.setBounds(0, 0, width, height); //set bounds to the size of the game map
    this.cameras.main.startFollow(player, true); //camera follows player
    //this.cameras.main.setZoom(1.5);

    // set walls
    this.physics.world.setBounds(0, 0, width, height);

    // airdash event attempt - needs to have set length and immune to gravity (or velocity.y = 0?) for the duration
    // this.input.keyboard.on('keydown-C', function (event) {
    //     if (!player.body.onFloor()) {
    //         player.isDashing = true;
    //         if (player.flipX){
    //             player.body.velocity.x = -650;
    //         } else {
    //             player.body.velocity.x = 650;
    //         }
    //     }
    // });
};
