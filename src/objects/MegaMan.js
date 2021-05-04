const Phaser = require("phaser");
const walkingSpeed = 250;
const dashingSpeed = 650;
const jumpTimerIncrement = 50;

class MegaMan extends Phaser.GameObjects.Sprite {
    constructor(scene, ...args) {
        super(scene, ...args);
        this.initialized = false;
        scene.add.existing(this);
    }

    JumpTimer = 0;
    IsDashing = false;

    // For some reason, Phaser needs this empty method.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (!this.initialized) {
            this.body.collideWorldBounds = true;
        }
    }

    jump() {
        if (this.body.onFloor() && this.JumpTimer === 0) {
            this.JumpTimer += jumpTimerIncrement;
            this.body.setVelocityY(-200 - (this.JumpTimer))
        } else if (this.JumpTimer > 0 && this.JumpTimer < 400) {
            this.JumpTimer += jumpTimerIncrement;
            this.body.setVelocityY(-200 - (this.JumpTimer));
            if (this.anims.currentAnim.key !== 'jump' && !this.body.onFloor())
                this.play('jump');
            if (this.IsDashing) this.IsJumpDashing = true;
        }
    }

    run(movingLeft) {
        if (this.IsDashing && this.flipX === !movingLeft && this.body.onFloor()){
            this.IsDashing = false;
        }
        if (!this.IsDashing) {
            let direction = 1
            if (movingLeft){
                direction = -1;
            }
            this.body.velocity.x = walkingSpeed * direction;
            if (this.anims.currentAnim.key !== 'run' && this.body.onFloor())
                this.play('run');
        }
        this.flipX = movingLeft;
    }

    dash() {
        this.IsDashing = true;
    }

    stopDashing() {
        this.IsDashing = false;
    }

    shoot(movingLeft) {
        if (movingLeft) {
            this.bullets.fireBullet(this.x, this.y);
        }
        else {
            this.bullets.fireBullet(this.x, this.y);
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register("megaMan", function (...args) {
    const megaMan = new MegaMan(this.scene, ...args);

    this.displayList.add(megaMan);
    this.updateList.add(megaMan);

    return megaMan;
});
