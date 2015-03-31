/// <reference path="libs/phaser.d.ts" />

module Balls {

	export class MainMenu extends Phaser.State {

		playButton:Phaser.Sprite;

		create () {

			this.playButton = this.add.sprite(100, 100, 'playButton');
			this.input.onDown.addOnce(this.startGame, this);
		}

		startGame () {

			this.game.state.start('Level1', true, false);
		}
	}
}