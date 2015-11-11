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
        }

        startGame() {
            this.game.state.start(C.LEVEL, true, false);
        }
    }
}