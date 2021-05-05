const Phaser = require("phaser");

class Enemy extends Phaser.GameObjects.Sprite {
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

    shoot() {
        this.scene.bullets.fireBullet(this.x - 23, this.y - 1, true);
    }
}

Phaser.GameObjects.GameObjectFactory.register("enemy", function (...args) {
    const enemy = new Enemy(this.scene, ...args);

    this.displayList.add(enemy);
    this.updateList.add(enemy);

    return enemy;
});
