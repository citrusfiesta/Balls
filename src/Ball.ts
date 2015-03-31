/// <reference path="libs/phaser.d.ts" />
/// <reference path="Attacker.ts" />
/// <reference path="Defender.ts" />
/// <reference path="C.ts" />
/// <reference path="BallManager.ts" />

module Balls {

	export class Ball extends Phaser.Sprite {

		private _arcadePhysics:Phaser.Physics.Arcade;
		private _ballMan:BallManager;

		private _speed:number = 500;
		private _rotation:number;

		private _halfPi:number = Math.PI / 2;

		constructor(game:Phaser.Game, x:number, y:number, key:string, ballMan:BallManager) {
			super(game, x, y, key);
			this._arcadePhysics = game.physics.arcade;
			this._ballMan = ballMan;
			this.anchor.setTo(0.5, 0.5);
			game.add.existing(this);
			game.physics.enable(this);
			this._setUpPhysics();
		}

		private _setUpPhysics():void {
			this.body.bounce.setTo(1, 1, this.width);
			this.body.drag = 0;
		}

		private _setActive(active:boolean):void {
			// If true, the balls can't leave the screen. Will move off screen balls to stage.
			this.body.collideWorldBounds = active;

			if (active) {
				// Set the movement angle according to the rotation of the attacker when firing.
				this.body.velocity.copyFrom(this._arcadePhysics.velocityFromRotation
				(this._rotation, this._speed));
			} else {
				// Stop the movement and move back to off screen position.
				this.body.velocity = 0;
				this.body.position.x = this.body.position.y = C.OFFSCREEN;
			}
		}

		fire (x:number, y:number, rotation:number):void {
			this.body.position.x = x;
			this.body.position.y = y;
			this._rotation = rotation - this._halfPi;
			this._setActive(true);
		}

		private _backToPool():void {
			this._setActive(false);
			this._ballMan.backToPool(this);
		}
	}
}