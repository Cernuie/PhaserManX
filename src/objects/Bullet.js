const Phaser = require("phaser");

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
  }

  fire(x, y, movingLeft) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    if (movingLeft) {
      this.setVelocityX(-400);
    } else {
      this.setVelocityX(400);
    }
  }

  preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.x < 0 || this.x > 3840)
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
      frameQuantity: 200,
      active: false,
      visible: false,
      key: 'bullet'
    })
  }

  fireBullet(x, y, movingLeft) {
    let bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.body.setAllowGravity(false);
      bullet.fire(x, y, movingLeft)
    }
  }
}
