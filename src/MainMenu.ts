/// <reference path="libs/phaser.d.ts" />
/// <reference path="C.ts" />

module Balls {

    export class MainMenu extends Phaser.State {

        playButton: Phaser.Button;

        create() {
            this.playButton = this.add.button(this.game.stage.width / 2,
                this.game.stage.height / 2 + 100, C.PLAY_BUTTON, this.startGame, this);
            this.playButton.anchor.x = 0.5;
            this.playButton.anchor.y = 0.5;

            var text: Phaser.Text = this.game.add.text(this.game.stage.width / 2, 20,
                'Controls for player 1 (square): left, right, up\nControls for player 2 (rectangle): A, D\n\n' +
                'Square shoots with UP and tries to score, rectangle defends by blocking\n\n' +
                'Square should try to get as much points in 30 seconds as possible,\n' +
                'rectangle should try to block as much as possible', {
                    font: "25px sans-serif",
                    fill: "#222222",
                    align: 'center'
                });
            text.anchor.x = 0.5;
            text.anchor.y = 0;
        }

        startGame() {
            this.game.state.start(C.LEVEL, true, false);
        }
    }
}