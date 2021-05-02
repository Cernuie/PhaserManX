const world = require("../world");
const { width, height } = require("../constants");
const { Cameras } = require("phaser");

module.exports = function create() {

    // adds background image
    this.add.image(960, 540, 'bg');

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
    let megaMan = this.add.megaMan(90, 160, "megamanxsprite1");
    megaMan.displayWidth = width*.1;
    megaMan.scaleY = megaMan.scaleX;
    megaMan.play('idle');

    const player = megaMan
    world.player = this.physics.add.existing(player);

    // camera settings
    this.cameras.main.setBounds(0, 0, width, height); //set bounds to the size of the game map
    this.cameras.main.startFollow(world.player, true); //not sure why it works w/ world.player, this.player seemed to break it
    //this.cameras.main.setZoom(1.5);

    // set walls
    this.physics.world.setBounds(0, 0, width, height);

    // this.input.keyboard.on('keydown-C', function (event) {
    //     if (player.body.onFloor()) {
    //         player.isDashing = true;
    //         if (player.flipX){
    //             player.body.velocity.x = -650;
    //         } else {
    //             player.body.velocity.x = 650;
    //         }
    //     }
    // });
};
