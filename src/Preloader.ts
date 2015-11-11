/// <reference path="libs/phaser.d.ts" />
/// <reference path="C.ts" />

module Balls {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            this.preloadBar = this.add.sprite(400, 300, C.PRELOAD_BAR);
            this.preloadBar.anchor.x = 0.5;
            this.preloadBar.anchor.y = 0.5;
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image(C.PLAY_BUTTON, C.PLAY_BUTTON_PATH);
            this.load.image(C.ATTACKER, C.ATTACKER_PATH);
            this.load.image(C.DEFENDER, C.DEFENDER_PATH);
            this.load.image(C.BALL, C.BALL_PATH);
            this.load.image(C.GROUND, C.GROUND_PATH);
            this.load.image(C.GOAL, C.GOAL_PATH);
        }

        create() {

            // Here you can do shit before calling startMainMenu ()
            var tween = this.add.tween(this.preloadBar).to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {

            this.game.state.start(C.MAIN_MENU, true, false);
        }
    }
}