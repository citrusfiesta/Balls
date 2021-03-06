/// <reference path="libs/phaser.d.ts" />
/// <reference path="Attacker.ts" />
/// <reference path="Defender.ts" />
/// <reference path="Ground.ts" />
/// <reference path="Goal.ts" />
/// <reference path="BallManager.ts" />
/// <reference path="C.ts" />

module Balls {

	export class Level extends Phaser.State {

		private _attacker:Attacker;
		private _defender:Defender;
		private _ballMan:BallManager;
		private _ground:Ground;
		private _goal:Goal;

		screenMid:number;

		create() {
			this.screenMid = this.game.stage.width / 2;
			this.game.physics.enable(this.game);

			this._attacker = new Attacker(this.game, this.screenMid, 500, C.ATTACKER);
			this._defender = new Defender(this.game, this.screenMid, 100, C.DEFENDER);
			this._ground = new Ground(this.game, this.screenMid, 566, C.GROUND);
			this._goal = new Goal(this.game, this.screenMid, 25, C.GOAL);
			// Be careful with the array in the second parameter, it's order is important
			// for collision detection in Ball._checkCollision()
			this._ballMan = new BallManager (this.game, this._defender, [this._attacker, this._ground, this._goal]);

			// Pass the BallManger reference to the attacker.
			this._attacker.setBallManager(this._ballMan);
		}
	}
}
