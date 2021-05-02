const world = require("../world");
const { width, height, cameraWidth, cameraHeight } = require("../constants");
const { Cameras } = require("phaser");

module.exports = function create() {

    // adds background image
    this.add.image(960, 540, 'bg');

    // creates various animations for megaman
    this.anims.create({
        key: 'warping_in',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'spawn',
            suffix: '.png',
            start: 0,
            end: 0,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'landing',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'spawn',
            suffix: '.png',
            start: 0,
            end: 6,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'idle',
            suffix: '.png',
            start: 0,
            end: 2,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: -1,
        repeatDelay: 2000,
        yoyo: true
    });

    this.keys = {
        jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        jump2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
        fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        dash: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    };

    // scale test for camera
    let megaMan = this.add.megaMan(100, 100, "megaman"); 
    megaMan.displayWidth = cameraWidth * .1; //determines player's relative size
    megaMan.scaleY = megaMan.scaleX;
    megaMan.play('idle');

    const player = megaMan
    world.player = this.physics.add.existing(player);
    world.player.play('warping_in');

    // camera settings
    this.cameras.main.setBounds(0, 0, width, height); //set bounds to the size of the game map
    this.cameras.main.startFollow(world.player, true); //not sure why it works w/ world.player, this.player seemed to break it
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
