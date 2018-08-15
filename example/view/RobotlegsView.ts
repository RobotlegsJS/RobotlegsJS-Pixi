// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, Sprite } from "pixi.js";

export class RobotlegsView extends Container {
    constructor() {
        super();

        this.loadLogo();
    }

    private loadLogo(): void {
        // create a PIXI sprite from an image path
        let robotlegsLogo: Sprite = Sprite.fromImage("images/robotlegs.png");

        // center the sprite's anchor point
        robotlegsLogo.anchor.set(0.5);

        // move the sprite to the center of the canvas
        robotlegsLogo.x = 960 * 0.5 - robotlegsLogo.width * 0.5;
        robotlegsLogo.y = 400 * 0.5;

        // Opt-in to interactivity
        robotlegsLogo.interactive = true;

        // Shows hand cursor
        robotlegsLogo.buttonMode = true;

        // add logo
        this.addChild(robotlegsLogo);
    }
}
