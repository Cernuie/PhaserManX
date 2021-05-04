export default class MoveRightState
{
	/** @type {Phaser.Physics.Arcade.Sprite} */
	player

	/**
	 * @param {Phaser.Physics.Arcade.Sprite} player 
	 */
	constructor(player)
	{
		this.player = player
	}

  enter() 
  {
    
  }

  update() 
  {
    if (this.player.body.onFloor() && this.player.JumpTimer === 0) {
      this.player.JumpTimer += 50;
      this.player.body.setVelocityY(-200 - (this.player.JumpTimer))
  } else if (this.player.JumpTimer > 0 && this.player.JumpTimer < 400) {
      this.player.JumpTimer += 50;
      this.player.body.setVelocityY(-200 - (this.player.JumpTimer));
      if (this.player.anims.currentAnim.key !== 'jump' && !this.player.body.onFloor())
          this.player.play('jump');
      if (this.player.IsDashing) this.player.IsJumpDashing = true;
  }
  }
}