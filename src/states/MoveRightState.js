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
    if (this.player.body.onFloor()) {
			this.player.play('run')
		}
    }

	update()
	{
		this.player.flipX = false
		this.player.body.velocity.x = 250
    }
}