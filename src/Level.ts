/// <reference path="libs/phaser.d.ts" />
/// <reference path="Attacker.ts" />
/// <reference path="Defender.ts" />
/// <reference path="Ground.ts" />
/// <reference path="Goal.ts" />
/// <reference path="BallManager.ts" />
/// <reference path="C.ts" />
/// <reference path="End.ts" />

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

            this._timer = 0;
            this._timerText = this.game.add.text(this.screenMid, this.game.stage.height / 2,
                this._timer.toFixed(1), {
                    font: "bold 60px sans-serif",
                    fill: "#888888",
                    align: "center"
                });
            this._timerText.anchor.x = 0.5;
            this._timerText.anchor.y = 0.5;
        }

        update() {
            if (++this._timer <= 1800) {
                this._timerText.text = (30 - (Math.floor(this._timer / 60) +
                    (this._timer % 60) / 60)).toFixed(1);
            } else if (this._timer === 1801) {
                this.stopGameAndFade();
            }
        }

        stopGameAndFade() {
            this.game.stage.removeChildren();
            this.game.state.start(C.END, true, false);
        }
    }
}