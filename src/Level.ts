/// <reference path="libs/phaser.d.ts" />
/// <reference path="Attacker.ts" />
/// <reference path="BallManager.ts" />
/// <reference path="C.ts" />

module Balls {

	export class Level extends Phaser.State {

		private _attacker:Attacker;
		private _ballMan:BallManager;

		screenMid:number;

		preload() {
			this.load.image(C.ATTACKER, C.ATTACKER_PATH);
			this.load.image(C.BALL, C.BALL_PATH);
		}

		create() {
			this._ballMan = new BallManager (this.game);
			this.screenMid = this.game.stage.width / 2;
			this.game.physics.enable(this.game);
			this._attacker = new Attacker(this.game, this.screenMid, 500, C.ATTACKER, this._ballMan);
		}
	}
}