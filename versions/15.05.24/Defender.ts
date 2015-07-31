/// <reference path="libs/phaser.d.ts" />

module Balls {

	export class Defender extends Phaser.Sprite {

		private _acceleration:number = 3200;
		private _drag:number = 2100;
		private _maxVelocity:number = 800;

		constructor(game:Phaser.Game, x:number, y:number, key:string) {
			// Pass the parameters on to the superclass.
			super(game, x, y, key);
			// Set the anchor point to the center of the object.
			this.anchor.setTo(0.5, 0.5);
			// Add this object to the game.
			game.add.existing(this);
			// Enable physics for this object and set it up.
			game.physics.enable(this);
			this._setUpPhysics();
		}

		update () {
			this._move();
		}

		private _setUpPhysics():void {
			this.body.collideWorldBounds = true;
			// How much the object bounces off of other objects/walls. 0.5 = 50%.
			this.body.bounce.setTo(0.5);
			this.body.maxVelocity.x = this._maxVelocity;
			this.body.drag.x = this._drag;
			// Ensures that it won't move if hit.
			this.body.immovable = true;
		}

		private _move():void {
			// Set the acceleration back to 0, so that the acceleration
			// of the previous frame isn't kept if the button is released.
			this.body.acceleration.x = 0;

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
				this.body.acceleration.x = -this._acceleration;
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
				this.body.acceleration.x = this._acceleration;
		}
	}
}
