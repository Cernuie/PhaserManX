const Phaser = require("phaser");

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
  }

  fire(x, y) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(-400);
  }

  preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.x <= -32 || this.x >= 1200)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Bullet,
      frameQuantity: 5,
      active: false,
      visible: false,
      key: 'bullet'
    })
  }

  fireBullet(x, y) {
    let bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y)
    }
  }
}
