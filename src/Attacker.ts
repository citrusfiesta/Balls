/// <reference path="libs/phaser.d.ts" />
/// <reference path="BallManager.ts" />

module Balls {

	export class Attacker extends Phaser.Sprite {

		private _ballMan:BallManager;

		private _acceleration:number = 2400;//1600
		private _drag:number = 1600;//1000
		private _maxVelocity:number = 500;
		private _fireLimit:number = 5;
		private _counter:number = this._fireLimit;



		/**
		 * Attacker can move horizontally, and shoot balls upwards.
		 *
		 * @param game The current Phaser game object.
		 * @param x The horizontal spawning position.
		 * @param y The vertical spawning position.
		 * @param key String used to retrieve the texture from the Phaser.Cache.
		 * @param ballMan BallManager instance for communication with BallManager class.
		 */
		constructor(game:Phaser.Game, x:number, y:number, key:string, ballMan:BallManager) {
			// Pass the parameters on to the superclass.
			super(game, x, y, key);
			// Assign the ball manager to its variable.
			this._ballMan = ballMan;
			// Set the anchor point to the center of the object.
			this.anchor.setTo(0.5, 0.5);
			// Add this object to the game.
			game.add.existing(this);
			// Enable physics for this object and set it up.
			game.physics.enable(this);
			this._setUpPhysics();
		}

		private _setUpPhysics():void {
			this.body.collideWorldBounds = true;
			// Setting the x-value of bounce to 1 (i.e. 100%).
			this.body.bounce.setTo(1);
			this.body.maxVelocity.x = this._maxVelocity;
			this.body.drag.x = this._drag;
		}

		update() {
			this._move();
			this._fire();
		}

		private _move():void {
			// Set the acceleration back to 0, so that the acceleration
			// of the previous frame isn't kept if the button is released.
			this.body.acceleration.x = 0;

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
				this.body.acceleration.x = -this._acceleration;
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
				this.body.acceleration.x = this._acceleration;

			// Angle the object slightly towards the movement vector.
			this.body.sprite.rotation = this.body.velocity.x / 2000;
		}

		private _fire():void {
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				if (++this._counter > this._fireLimit) {
					this._ballMan.fireBall(this.x, this.y, this.rotation);
					this._counter = 0;
				}
			}
		}
	}
}