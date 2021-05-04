const world = require('../world');
const Phaser = require('Phaser');
const dashingSpeed = 650;
const { default: PlayerController } = require("../PlayerController");

module.exports = function update() {
    const cursors = this.input.keyboard.createCursorKeys();

    const { left, right} = cursors;
    const { player } = world;

    // animate the starting beam landing
    if (player.body.onFloor() && player.anims.currentAnim.key === 'warping_in'){
        player.play('landing').on('animationcomplete', () => 
        {
            player.play('idle'); 
        });
    }

    if (this.keys.fire.isDown) {
      console.log("shot");
      player.play('fire');
    }


    if (player.IsDashing) {
        if (player.flipX){
            player.body.velocity.x = -dashingSpeed;
        } else {
            player.body.velocity.x = dashingSpeed;
        }
    }

    if (player.body.onFloor() && player.IsJumpDashing){
        player.IsDashing = false;
        player.IsJumpDashing = false;
    }

    // if (!player.IsDashing){
    //     if (left.isUp) {
    //         player.body.velocity.x = 0;
    //     }
    
    //     if (right.isUp) {
    //         player.body.velocity.x = 0;
    //     }

    //     if (left.isUp && right.isUp &&  player.body.onFloor() && player.anims.currentAnim.key !== 'idle') {
    //         player.play('idle');
    //     }
    // }

    if (left.isDown) {
        // player.run(true);
        this.PlayerController.setState('moveLeft')
        console.log('hi')
        // player.body.velocity.x = -250 
    } else if (right.isDown) {
        //player.run(false);
        this.PlayerController.setState('moveRight')
        //player.body.velocity.x = 250
    } else {
      this.PlayerController.setState('idle')
    }

    if (this.keys.jump.isDown || this.keys.jump2.isDown) {
        player.jump();
    }
    else {
        player.JumpTimer = 0;
    }

    this.PlayerController.runCurrentState();
};
