/// <reference path="libs/phaser.d.ts" />
/// <reference path="BallManager.ts" />

module Balls {

	export class Attacker extends Phaser.Sprite {

		private _ballMan:BallManager;

		private _acceleration:number = 2400;
		private _drag:number = 1600;
		private _maxVelocity:number = 500;
		private _fireLimit:number = 5;
		private _counter:number = this._fireLimit;
		/**
		 * Helps set the y position for spawning balls.
		 */
		private _spawnOffset:number;



		/**
		 * Attacker can move horizontally, and shoot balls upwards.
		 *
		 * @param game The current Phaser game object.
		 * @param x The horizontal spawning position.
		 * @param y The vertical spawning position.
		 * @param key String used to retrieve the texture from the Phaser.Cache.
		 */
		constructor(game:Phaser.Game, x:number, y:number, key:string) {
			// Pass the parameters on to the superclass.
			super(game, x, y, key);
			// Set the anchor point to the center of the object.
			this.anchor.setTo(0.5, 0.5);
			// Add this object to the game.
			game.add.existing(this);
			// Enable physics for this object and set it up.
			game.physics.enable(this);
			this._spawnOffset = Math.round(this.height * 0.7);
			console.debug("offset", this._spawnOffset);
			this._setUpPhysics();
		}

		update() {
			this._move();
			this._fire();
		}

		setBallManager(ballMan:BallManager):void {
			this._ballMan = ballMan;
		}

		private _setUpPhysics():void {
			this.body.collideWorldBounds = true;
			// Setting the x-value of bounce to 1 (i.e. 100%).
			this.body.bounce.setTo(1);
			this.body.maxVelocity.x = this._maxVelocity;
			this.body.drag.x = this._drag;
			// Ensures that it won't move if hit.
			this.body.immovable = true;
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
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				if (++this._counter > this._fireLimit) {
					this._ballMan.fireBall(this.x, this.y - this._spawnOffset, this.rotation);
					this._counter = 0;
				}
			}
		}
	}
}