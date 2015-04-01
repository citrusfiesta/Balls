/// <reference path="libs/phaser.d.ts" />
/// <reference path="Ball.ts" />
/// <reference path="C.ts" />

module Balls {

	export class BallManager {

		/**
		 * Reference to the current instance of Phaser.Game
		 */
		private _game:Phaser.Game;
		/**
		 * The pool of Balls. Prevents constant instantiating and destruction.
		 */
		private _pool:Array<Ball>;

		private _poolCounter:number;

		constructor(game:Phaser.Game, collArray:Array<Phaser.Sprite>) {
			this._game = game;
			this._pool = this._createPool(32, game, C.OFFSCREEN, C.OFFSCREEN, C.BALL, collArray);
		}


		fireBall(x:number, y:number, rotation:number):void {
			this._getBall().fire(x, y, rotation);
		}

		backToPool(ball:Ball):void {
			this._returnBall(ball);
		}

		/**
		 * Creates an array of the given size, fills it with instances of Ball, and returns that array.
		 * @param size How large the array will be.
		 * @param game The current instance of Phaser.Game. Used for creating an instance of Ball.
		 * @param x	Horizontal spawn position when creating an instance of Ball.
		 * @param y Vertical spawn position when creating an instance of Ball.
		 * @param key Reference to the Ball texture. Used for creating an instance of Ball.
		 * @param collArray Array of the items that instances of Ball can collide with.
		 * @returns {Array<Ball>}
		 * @private
		 */
		private _createPool(size:number, game:Phaser.Game, x:number, y:number, key:string,
							collArray:Array<Phaser.Sprite>):Array<Ball> {
			var array:Array<Ball> = [];
			this._poolCounter = size;

			var i:number = size;
			while (--i > -1)
				array.push(new Ball(game, x, y, key, this, collArray));
			return array;
		}

		private _returnBall(ball:Ball):void {
			this._pool[this._poolCounter++] = ball;
		}

		private _getBall():Ball {
			if (this._poolCounter > 0)
				return this._pool[--this._poolCounter];
			else
				throw new Error ("Pool is exhausted.");
		}
	}
}
