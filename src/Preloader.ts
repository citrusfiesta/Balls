/// <reference path="libs/phaser.d.ts" />

module Balls {

	export class Preloader extends Phaser.State {

		preloadBar:Phaser.Sprite;

		preload () {

			this.preloadBar = this.add.sprite(400, 300, 'preloadBar');
			this.load.setPreloadSprite(this.preloadBar);

			this.load.image ('playButton', 'assets/img/playButton.png');
			this.load.image ('attacker', 'assets/img/attacker.png');
			this.load.image ('defender', 'assets/img/defender.png');
		}

		create () {

			// Here you can do shit before calling startMainMenu ()
			var tween = this.add.tween(this.preloadBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
			tween.onComplete.add(this.startMainMenu, this);
		}

		startMainMenu () {

			this.game.state.start ('MainMenu', true, false);
		}
	}
}