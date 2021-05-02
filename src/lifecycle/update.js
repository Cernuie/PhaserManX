const world = require("../world");
const Phaser = require("Phaser");
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

    if (this.keys.dash.isDown) {
        isDashing = true;
        if (player.flipX){
            player.body.velocity.x = -dashingSpeed;
        } else {
            player.body.velocity.x = dashingSpeed;
        }
    }
    if (this.keys.dash.isUp) {
        isDashing = false;
    }

    if (!isDashing){
        if (left.isUp) {
            player.body.velocity.x = 0;
        }
    
        if (right.isUp) {
            player.body.velocity.x = 0;
        }
    }

    if (left.isDown) {
        if (!isDashing) {
            player.body.velocity.x = -walkingSpeed;
        }
        player.flipX = true;
    }

    if (right.isDown) {
        if (!isDashing) {
            player.body.velocity.x = walkingSpeed;
        }
        player.flipX = false;
    }

    if (this.keys.jump.isDown || this.keys.jump2.isDown) {
        if (player.body.onFloor() && jumpTimer === 0) {
            jumpTimer += jumpTimerIncrement;
            player.body.setVelocityY(-200 - (jumpTimer))
        } else if (jumpTimer > 0 && jumpTimer < 400) {
            jumpTimer += jumpTimerIncrement;
            player.body.setVelocityY(-200 - (jumpTimer))
        }
    }
    else {
        jumpTimer = 0;
    }
};
