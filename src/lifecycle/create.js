const world = require("../world");
const { width, height } = require("../constants");

module.exports = function create() {

    // At some point we should probably put these animations in their own file or function or something

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

    let megaMan = this.add.megaMan(width/2, height/2, "megamanxsprite1");
    megaMan.displayWidth = width*.1;
    megaMan.scaleY = megaMan.scaleX;
    megaMan.play('idle');

    const player = megaMan
    world.player = this.physics.add.existing(player);
    world.player.play('warping_in');

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
