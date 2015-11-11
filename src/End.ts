/// <reference path="libs/phaser.d.ts" />
/// <reference path="C.ts" />

module Balls {

    export class End extends Phaser.State {

        create() {
            var black = this.game.add.sprite(0, 0, C.BLACK);
            black.alpha = 0;
            this.add.tween(black).to({
                alpha: 0.5
            }, 1000, Phaser.Easing.Linear.None, true);

            var text: Phaser.Text = this.game.add.text(this.game.stage.width / 2, 150,
                'Square ended the game with a score of ' + C.score.toString() + '\n\n' +
                'Click anywhere to restart.', {
                    font: "25px sans-serif",
                    fill: "#dedede",
                    align: 'center'
                });
            text.anchor.x = 0.5;
            text.anchor.y = 0;

            this.input.onDown.addOnce(this.restartGame, this);
        }

        restartGame() {
            this.game.state.start(C.MAIN_MENU, true, false);
        }
    }
}