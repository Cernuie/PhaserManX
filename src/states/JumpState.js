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
    const cursors = this.input.keyboard.createCursorKeys();

    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
  };

    console.log(this.player.body.velocity.x)
    this.player.body.setVelocityX(this.player.body.velocity.x)
  } 

  update() 
  {
    
    if (this.keys.left.isDown)
		{
			this.sprite.flipX = true
			this.sprite.setVelocityX(-250)
		}
		else if (this.keys.right.isDown)
		{
			this.sprite.flipX = false
			this.sprite.setVelocityX(250)
		}
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