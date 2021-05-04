const Phaser = require('Phaser');

export default class IdleState
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
    this.player.play('idle')
		this.player.body.setVelocity(0, 0)
    }

    update()
    {
    }
}
