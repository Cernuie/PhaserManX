const Phaser = require("phaser");

class MegaMan extends Phaser.GameObjects.Sprite {
  constructor(scene, ...args) {
    super(scene, ...args);
    this.initialized = false;
    scene.add.existing(this);
  }

  // For some reason, Phaser needs this empty method.
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (!this.initialized) {
      this.body.collideWorldBounds = true;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register("megaMan", function (...args) {
  const megaMan = new MegaMan(this.scene, ...args);

  this.displayList.add(megaMan);
  this.updateList.add(megaMan);

  return megaMan;
});
