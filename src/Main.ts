/// <reference path="libs/phaser.d.ts" />
/// <reference path="Boot.ts" />
/// <reference path="Preloader.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="Level.ts" />
/// <reference path="End.ts" />
/// <reference path="C.ts" />

module Balls {

	export class Main {

		game:Phaser.Game;

		constructor() {
			this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

			this.game.state.add(C.BOOT, Boot, false);
			this.game.state.add(C.PRELOADER, Preloader, false);
			this.game.state.add(C.MAIN_MENU, MainMenu, false);
			this.game.state.add(C.LEVEL, Level, false);
			this.game.state.add(C.END, End, false);

			this.game.state.start(C.BOOT, true, true);
		}
	}
}