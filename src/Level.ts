/// <reference path="libs/phaser.d.ts" />
/// <reference path="Attacker.ts" />
/// <reference path="Defender.ts" />
/// <reference path="Ground.ts" />
/// <reference path="Goal.ts" />
/// <reference path="BallManager.ts" />
/// <reference path="C.ts" />

module Balls {

    export class Level extends Phaser.State {

        private _attacker: Attacker;
        private _defender: Defender;
        private _ballMan: BallManager;
        private _ground: Ground;
        private _goal: Goal;
        private _timer: number;
        private _timerText: Phaser.Text;

        screenMid: number;

        create() {
            this.screenMid = this.game.stage.width / 2;
            this.game.physics.enable(this.game);

            this._attacker = new Attacker(this.game, this.screenMid, 500, C.ATTACKER);
            this._defender = new Defender(this.game, this.screenMid, 100, C.DEFENDER);
            this._ground = new Ground(this.game, this.screenMid, 566, C.GROUND);
            this._goal = new Goal(this.game, this.screenMid, 25, C.GOAL);
            // Be careful with the array in the second parameter, it's order is important
            // for collision detection in Ball._checkCollision()
            this._ballMan = new BallManager(this.game, this._defender, [this._attacker, this._ground, this._goal]);

            // Pass the BallManger reference to the attacker.
            this._attacker.setBallManager(this._ballMan);

            this._timer = 60 * 30;
            this._timerText = this.game.add.text(this.screenMid, 50, this._timer.toFixed(1), {
                font: "15px sans-serif",
                fill: "#222222"
            });
        }

        update() {
            this._timer--;
            this._timerText.text = (Math.floor(this._timer / 60) +
                (this._timer % 60) / 60).toFixed(1);
            if (this._timer === 0)
                console.log('timer done');
        }
    }
}