/// <reference path="libs/phaser.d.ts" />
/// <reference path="Boot.ts" />
/// <reference path="Preloader.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="Level.ts" />

module Balls {

	export class Main {

		game:Phaser.Game;

		constructor() {
			this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

			this.game.state.add("Boot", Boot, false);
			this.game.state.add("Preloader", Preloader, false);
			this.game.state.add("MainMenu", MainMenu, false);
			this.game.state.add("Level", Level, false);

			this.game.state.start("Boot", true, true);
			//this.game.state.start("Level", true, true);
		}
	}
}