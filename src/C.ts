/// <reference path="libs/phaser.d.ts" />

module Balls {

	export class C {

		static PRELOAD_BAR:string = "preloadBar";
		static PRELOAD_BAR_PATH:string = "assets/img/preloadBar.png";
		static PLAY_BUTTON:string = "playButton";
		static PLAY_BUTTON_PATH:string = "assets/img/playButton.png";


		static ATTACKER:string = "attacker";
		static ATTACKER_PATH:string = "assets/img/attacker.png";
		static DEFENDER:string = "defender";
		static DEFENDER_PATH:string = "assets/img/defender.png";
		static BALL:string = "ball";
		static BALL_PATH:string = "assets/img/ball.png";
		/**
		 * The x and y value that Ball objects are at when they're not active.
		 * @type {number}
		 */
		static OFFSCREEN:number = -50;
	}
}