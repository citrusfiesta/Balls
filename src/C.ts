/// <reference path="libs/phaser.d.ts" />

module Balls {

	export class C {

		static BOOT:string = "Boot";
		static PRELOADER:string ="Preloader";
		static MAIN_MENU:string = "MainMenu";
		static LEVEL:string = "Level";
		static END:string = "End";


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

		static GROUND:string = "ground";
		static GROUND_PATH:string = "assets/img/ground.png";
		static GOAL:string = "goal";
		static GOAL_PATH:string = "assets/img/goal.png";

		/**
		 * The x and y value that Ball objects are at when they're not active.
		 * @type {number}
		 */
		static OFFSCREEN:number = -50;
	}
}
