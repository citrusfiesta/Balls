/// <reference path="libs/phaser.d.ts" />
/// <reference path="C.ts" />

module Balls {

	/*
	 Our Boot class is where we define global settings for the game. It’s also were we preload the
	 graphics that will be used by the actual Preloader, in this case a simple loading bar image.
	 */
	export class Boot extends Phaser.State {

		preload () {

			this.load.image(C.PRELOAD_BAR, C.PRELOAD_BAR_PATH);
		}

		create () {
			// If tab loses focus, the game does not pause.
			//this.stage.disableVisibilityChange = true;

			if (this.game.device.desktop) {// If game is played on a PC, execute these desktop specific settings

			} else {// Else (it's played on mobile and) load mobile specific settings

			}

			this.game.state.start('Preloader', true, false);
		}
	}
}