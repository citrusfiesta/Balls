/// <reference path="libs/phaser.d.ts" />
/// <reference path="C.ts" />

module Balls {

	export class Preloader extends Phaser.State {

		preloadBar:Phaser.Sprite;

		preload () {

			this.preloadBar = this.add.sprite(400, 300, C.PRELOAD_BAR);
			this.load.setPreloadSprite(this.preloadBar);

			this.load.image('playButton', 'assets/img/playButton.png');
			this.load.image(C.ATTACKER, C.ATTACKER_PATH);
			this.load.image(C.DEFENDER, C.DEFENDER_PATH);
			this.load.image(C.BALL, C.BALL_PATH);
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