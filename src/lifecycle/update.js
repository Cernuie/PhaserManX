const world = require("../world");
const Phaser = require("Phaser");

module.exports = function update() {
  const cursors = this.input.keyboard.createCursorKeys();

  const { left, right} = cursors;
  const { player } = world;
  //crappy left-right movement on key up/down
  //order matters here, if isUp is after isDown it doesn't work
  if (left.isUp) {
    player.body.velocity.x = 0;
  }

  if (right.isUp) {
    player.body.velocity.x = 0;
  }

  if (left.isDown) {
    player.body.velocity.x = -150;
  }

  if (right.isDown) {
    player.body.velocity.x = 150;
  }

};
