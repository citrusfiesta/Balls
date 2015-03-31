/// <reference path="libs/phaser.d.ts" />

module Balls {

	export class C {

		static ATTACKER:string = "attacker";
		static ATTACKER_PATH:string = "assets/img/attacker.png";
		static BALL:string = "ball";
		static BALL_PATH:string = "assets/img/ball.png";
		/**
		 * The x and y value that Ball objects are at when they're not active.
		 * @type {number}
		 */
		static OFFSCREEN:number = -50;
	}
}