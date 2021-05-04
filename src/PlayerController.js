import IdleState from './states/IdleState'
import MoveLeftState from './states/MoveLeftState'
import MoveRightState from './states/MoveRightState'
const Phaser = require('Phaser');


export default class PlayerController
{
	/** @type {{ [key: string]: { enter: () => void } }} */
	states

	/** @type {{ enter: () => void }} */
	currentState

	/**
	 * @param {Phaser.Physics.Arcade.Sprite} player 
	 */
	constructor(player)
	{
		this.states = {
			// TODO: add states
      idle: new IdleState(player),
      moveLeft: new MoveLeftState(player),
      moveRight: new MoveRightState(player)
		}
	}

	/**
	 * 
	 * @param {string} name 
	 */
   setState(name)
   {
     if (this.currentState === this.states[name])
     {
       return
     }
   
     this.currentState = this.states[name]
     this.currentState.enter()
    }
    runCurrentState() {
		      if (this.currentState) {
				  this.currentState.update();
        }
    }
   }
