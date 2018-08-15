// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, Sprite } from "pixi.js";

export class RobotlegsView extends Container {
    private robotlegsLogo: Sprite;

    constructor() {
        super();

        this.loadLogo();
        this.move();
        this.enable();
    }

    private loadLogo(): void {
        // create a PIXI sprite from an image path
        this.robotlegsLogo = Sprite.fromImage("images/robotlegs.png");

        // add logo
        this.addChild(this.robotlegsLogo);
    }

    private move(): void {
        // center the sprite's anchor point
        this.robotlegsLogo.anchor.set(0.5);

        // move the sprite to the center of the canvas
        this.robotlegsLogo.x = 960 * 0.5;
        this.robotlegsLogo.y = 400 * 0.5;
    }

    private enable(): void {
        // Opt-in to interactivity
        this.interactive = true;

        // Shows hand cursor
        this.buttonMode = true;
    }
}
