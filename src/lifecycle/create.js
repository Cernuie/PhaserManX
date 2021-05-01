const world = require("../world");
const { width, height } = require("../constants");

module.exports = function create() {

  var config = {
    key: 'idle',
    frames: this.anims.generateFrameNumbers('megamanxsprite1', {start: 2, end: 40}),
    frameRate: 20,
    repeat: -1
  };

  this.anims.create(config);
  
  let megaMan = this.add.megaMan(width/2, height/2, "megamanxsprite1");
  megaMan.play('idle');

  const player = megaMan
  world.player = this.physics.add.existing(player);

  // set walls
  this.physics.world.setBounds(0, 0, width, height);
  
  this.input.on("pointerdown", function (pointer) {
    player.shoot(pointer);
  });
};
