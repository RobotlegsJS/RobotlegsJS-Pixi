// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, Graphics } from "pixi.js";

export class SmileyView extends Container {
    private _radius: number;

    constructor(radius: number) {
        super();

        this._radius = Math.max(radius, 50);

        this.drawSmiley();
        this.move();
        this.enable();
    }

    private drawSmiley(): void {
        let graphics: Graphics = new Graphics();

        // Head
        graphics.lineStyle(8, 0x000000, 1);
        graphics.beginFill(0xffcc00);
        graphics.drawCircle(0, 0, this._radius);

        // Mouth
        graphics.lineStyle(8, 0x000000, 1);
        graphics.beginFill(0xffcc00);
        graphics.arc(0, 0, this._radius * 0.65, 0, Math.PI, false);

        // Right eye
        graphics.lineStyle(8, 0x000000, 1);
        graphics.beginFill(0x000000);
        graphics.drawCircle(-(this._radius / 3), -(this._radius / 4), this._radius / 8);

        // Left eye
        graphics.lineStyle(8, 0x000000, 1);
        graphics.beginFill(0x000000);
        graphics.drawCircle(this._radius / 3, -(this._radius / 4), this._radius / 8);

        this.addChild(graphics);
    }

    private move(): void {
        this.x = Math.random() * 960;
        this.y = Math.random() * 400;

        this.x = Math.max(this.x, this._radius);
        this.x = Math.min(this.x, 960 - this._radius);

        this.y = Math.max(this.y, this._radius);
        this.y = Math.min(this.y, 400 - this._radius);
    }

    private enable(): void {
        // Opt-in to interactivity
        this.interactive = true;

        // Shows hand cursor
        this.buttonMode = true;
    }
}
