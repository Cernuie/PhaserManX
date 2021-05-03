const Phaser = require("phaser");

class Bullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, ...args ) {
    super(scene, x, y, 'bullet');
    this.initialized = false;
    // this.setActive(true);
    // this.setVisible(true);
    
  }

  preUpdate() {
    //super.preUpdate(time, delta)
    this.body.collideWorldBounds = false;
    this.initialized = true;
  }

}

Phaser.GameObjects.GameObjectFactory.register("bullet", function (...args) {
  const bullet = new Bullet(this.scene, ...args);

  this.displayList.add(bullet);
  this.updateList.add(bullet);

  return bullet;
});
