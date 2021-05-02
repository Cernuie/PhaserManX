const world = require('../world');
const Phaser = require('Phaser');
const walkingSpeed = 250;
const dashingSpeed = 650;
const jumpTimerIncrement = 50;

let jumpTimer = 0;
let isDashing = false;

module.exports = function update() {
    const cursors = this.input.keyboard.createCursorKeys();

    const { left, right} = cursors;
    const { player } = world;
    //crappy left-right movement on key up/down
    //order matters here, if isUp is after isDown it doesn't work

    // animate the starting beam landing
    if (player.body.onFloor() && player.anims.currentAnim.key === 'warping_in'){
        player.play('landing').on('animationcomplete', () => 
        {
            player.play('idle');
        });
    }

    if (player.IsDashing) {
        if (player.flipX){
            player.body.velocity.x = -650;
        } else {
            player.body.velocity.x = 650;
        }
    }

    if (player.body.onFloor() && player.IsJumpDashing){
        player.IsDashing = false;
        player.IsJumpDashing = false;
    }

    if (!player.IsDashing){
        if (left.isUp) {
            player.body.velocity.x = 0;
        }
    
        if (right.isUp) {
            player.body.velocity.x = 0;
        }

        if (left.isUp && right.isUp && player.body.onFloor() && player.anims.currentAnim.key !== 'idle') {
            player.play('idle');
        }
    }

    if (left.isDown) {
        player.run(true);
    }

    if (right.isDown) {
        player.run(false);
    }

    if (this.keys.jump.isDown || this.keys.jump2.isDown) {
        player.jump();
    }
    else {
        player.JumpTimer = 0;
    }
};
