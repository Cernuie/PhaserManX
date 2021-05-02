const world = require("../world");
const { width, height } = require("../constants");

module.exports = function create() {

    //taken from https://labs.phaser.io/edit.html?src=src%5Cloader%5Ctexture%20atlas%20json%5Cload%20texture%20atlas.js
    //this isn't useful code, but i pasted it in as is just to see if i could get anything to work.
    //supposed to just place frames in random locations around the screen.
    // var atlasTexture = this.textures.get('spawn');

    // var frames = atlasTexture.getFrameNames();

    // for (var i = 0; i < frames.length; i++)
    // {
    //     var x = Phaser.Math.Between(0, 800);
    //     var y = Phaser.Math.Between(0, 600);

    //     this.add.image(x, y, 'spawn', frames[i]);
    // }

    //taken from https://www.thepolyglotdeveloper.com/2020/08/animate-compressed-sprite-atlas-phaser-game/
    //should play through the frames on loop
    this.anims.create({
      key: "landing",
      frameRate: 7,
      frames: this.anims.generateFrameNames('spawnIn', {
          prefix: 'spawn',
          suffix: '.png',
          start: 0,
          end: 7,
          zeroPad: 1
      }),
      repeat: -1
    });

    mmxSpawn = this.add.sprite(400, 300, 'spawnIn');
    mmxSpawn.play("landing")

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

    let megaMan = this.add.megaMan(width/2, height/2, "megamanxsprite1");
    megaMan.displayWidth = width*.1;
    megaMan.scaleY = megaMan.scaleX;
    megaMan.play('idle');

    const player = megaMan
    world.player = this.physics.add.existing(player);

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
