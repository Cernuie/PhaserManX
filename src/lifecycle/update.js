const world = require('../world');
const Phaser = require('Phaser');
const dashingSpeed = 650;
let timer = 0;
module.exports = function update(time, delta) {
    timer += delta;
    const cursors = this.input.keyboard.createCursorKeys();

    const { left, right} = cursors;
    const { player, enemies } = world;
    //crappy left-right movement on key up/down
    //order matters here, if isUp is after isDown it doesn't work
    if (player.y > 900) player.alive = false;
    if (!player.alive){
        if (player.IsDyingTimer >= 200) {
            this.scene.restart()
        }
        if (player.IsDyingTimer === 0) {
            player.play('death').on('animationcomplete', () => 
            {
                player.setVisible(false);
            });
        } else {
            this.gameOverScreen.alpha += delta * .0006;
        }
        player.IsDyingTimer += 1;
        return;
    }

    // animate the starting beam landing
    if (player.body.onFloor() && player.anims.currentAnim.key === 'warping_in'){
        player.play('landing').on('animationcomplete', () => 
        {
            player.play('idle');
        });
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

    if (this.keys.dash.isDown){
        if (player.body.onFloor()) {     
            player.dash();
            if (player.anims.currentAnim.key !== 'dash' && player.anims.currentAnim.key !== 'dash_start'){
                player.play('dash_start').on('animationcomplete', () => 
                {
                    player.play('dash');
                });
            }
        }
    }
    else {
        if (player.body.onFloor()) {
            player.stopDashing();
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

    if (this.keys.jump.isDown) {
      
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.fire)) {
        console.log(this.timeElapsed)
      player.shoot(player.flipX);
    }

    //console.log(player.x)

    //console.log(player.hp.bar)
    while (timer > 1000) {
        enemies.forEach(enemy => {
            enemy.shoot();
        });
        timer -= 1000;
    }
    
};
