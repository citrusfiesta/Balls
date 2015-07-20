/// <reference path="libs/phaser.d.ts" />

module Balls {

	export class Ground extends Phaser.Sprite {

		/**
		 * Ground destroys balls that are reflected back downwards.
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
			this._setUpPhysics();
		}

		private _setUpPhysics():void {
			// Ensures that it won't move if hit.
			this.body.immovable = true;
		}
	}
}
