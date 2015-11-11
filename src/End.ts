/// <reference path="libs/phaser.d.ts" />
/// <reference path="C.ts" />

module Balls {

    export class End extends Phaser.State {

        create() {
            var black = this.game.add.sprite(0, 0, C.BLACK);
            black.alpha = 0;
            this.add.tween(black).to({
                alpha: 0.5
            }, 1000, Phaser.Easing.Linear.None, true);
        }
    }
}