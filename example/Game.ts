// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import PIXI = require("pixi.js");

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "../src";

import { MyConfig } from "./config/MyConfig";
import { RobotlegsView } from "./view/RobotlegsView";

export class Game {
    private canvas: HTMLCanvasElement;
    private stage: PIXI.Container;
    private renderer: PIXI.Renderer;
    private context: Context;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.renderer = PIXI.autoDetectRenderer({
            width: 960,
            height: 400,
            view: this.canvas,
            backgroundColor: 0xffffff
        });
        this.stage = new PIXI.Container();

        this.context = new Context();
        this.context
            .install(MVCSBundle, PixiBundle)
            .configure(new ContextView(this.stage))
            .configure(MyConfig)
            .initialize();

        this.stage.addChild(new RobotlegsView());

        document.body.appendChild(this.renderer.view);

        this.render();
    }

    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    };
}
