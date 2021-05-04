const Phaser = require("phaser");

export default class MoveLeftState
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
    if (this.player.body.onFloor()){
		  this.player.play('run')
    }
    this.player.flipX = true
		const speed = 250
		this.player.body.setVelocityX(-speed)
	}
}
