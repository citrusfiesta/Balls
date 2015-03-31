/// <reference path="libs/phaser.d.ts" />
/// <reference path="Ball.ts" />
/// <reference path="BallManager.ts" />

module Balls {

	export class BallPool {

		private _items:Array<Ball>;
		private _counter:number;

		constructor(size:number, game:Phaser.Game, x:number, y:number, key:string,
					ballMan:BallManager) {
			this._items	= [];
			this._counter = size;

			var i:number = size;
			while (--i > -1)
				this._items.push(new Ball(game, x, y, key, ballMan));
		}

		getBall ():Ball {
			if (this._counter > 0)
				return this._items[--this._counter];
			else
				throw new Error ("Pool is exhausted.");
		}

		returnBall (ball:Ball):void {
			this._items[this._counter++] = ball;
		}
	}
}