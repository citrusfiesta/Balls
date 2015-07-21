/// <reference path="libs/phaser.d.ts" />
/// <reference path="Attacker.ts" />
/// <reference path="Defender.ts" />
/// <reference path="C.ts" />
/// <reference path="BallManager.ts" />

module Balls {

	export class Ball extends Phaser.Sprite {

		private _arcadePhysics:Phaser.Physics.Arcade;
		private _ballMan:BallManager;
		private _defender:Defender;
		private _overlapArray:Array<Phaser.Sprite>;

		private _speed:number = 500;
		private _rotation:number;

		/**
		 * Used in update() to decide if collisions need to be checked.
		 * @type {boolean}
		 * @private
		 */
		private _active:boolean = false;

		private _halfPi:number = Math.PI / 2;

		constructor(game:Phaser.Game, x:number, y:number, key:string, ballMan:BallManager,
					defender:Defender, overlapArray:Array<Phaser.Sprite>) {
			super(game, x, y, key);
			this._arcadePhysics = game.physics.arcade;
			this._ballMan = ballMan;
			this._defender = defender;
			this._overlapArray = overlapArray;
			this.anchor.setTo(0.5, 0.5);
			game.add.existing(this);
			game.physics.enable(this);
			this._setUpPhysics();
		}

		update() {
			if (this._active)
				this._checkCollision();
		}

		private _setUpPhysics():void {
			this.body.bounce.setTo(1, 1, this.width);
			this.body.drag = 0;
		}

		fire (x:number, y:number, rotation:number):void {
			this.x = x;
			this.y = y;
			this._rotation = rotation - this._halfPi;
			this._setActive(true);
		}

		private _setActive(active:boolean):void {
			// If true, the balls can't leave the screen. Will move off screen balls to stage.
			this.body.collideWorldBounds = active;
			this._active = active;

			if (active) {
				// Set the movement angle according to the rotation of the attacker when firing.
				this.body.velocity.copyFrom(this._arcadePhysics.velocityFromRotation
					(this._rotation, this._speed));
			} else {
				// Stop the movement and move back to off screen position.
				this.body.velocity = new Phaser.Point();
				this.x = this.y = C.OFFSCREEN;
			}
		}

		/**
		 * Called when the ball needs to be 'destroyed'. Sends it back to the pool to be reused later.
		 * @private
		 */
		private _backToPool():void {
			this._setActive(false);
			this._ballMan.backToPool(this);
		}

		private _checkCollision():void {
			if (this._arcadePhysics.collide(this, this._defender)) {
				console.debug("defender");
			}
			for (var i = 0, n = this._overlapArray.length; i < n; i++) {
				//for loop and if colliding, act accordingly and break out of for loop
				if(this._arcadePhysics.overlap(this, this._overlapArray[i])) {
					if (i == 0) {
						this._backToPool();
						//decrease score of attacker
					} else if (i == 1) {
						this._backToPool();
						//Add particles?
					}
					break;
				}
			}
		}
	}
}
