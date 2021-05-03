const Phaser = require("phaser");

class Bullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, ...args ) {
    super(scene, player.x, player.y, 5, 5, 0x00ff00);
    this.initialized = false;
  }
}