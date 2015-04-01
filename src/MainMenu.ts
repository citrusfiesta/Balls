/// <reference path="libs/phaser.d.ts" />

module Balls {

	export class MainMenu extends Phaser.State {

		playButton:Phaser.Sprite;

		create () {

			this.playButton = this.add.sprite(100, 100, C.PLAY_BUTTON);
			this.input.onDown.addOnce(this.startGame, this);
		}

		startGame () {
			this.game.state.start(C.MAIN_MENU, true, false);
		}
	}
}