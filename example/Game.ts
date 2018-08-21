// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/// <reference path="../definitions/pixi.d.ts" />

import "reflect-metadata";

import PIXI = require('pixi.js');

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "../src";

import { MyConfig } from "./config/MyConfig";
import { RobotlegsView } from "./view/RobotlegsView";

export class Game {

    private canvas: HTMLCanvasElement;
    private stage: PIXI.Container;
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private context: Context;

    constructor () {
        this.canvas = <HTMLCanvasElement>(document.getElementById("canvas"));
        this.renderer = PIXI.autoDetectRenderer(960, 400, { view: this.canvas, backgroundColor: 0xFFFFFF });
        this.stage = new PIXI.Container();

        this.context = new Context();
        this.context.install(MVCSBundle, PixiBundle).
            configure(new ContextView(this.stage)).
            configure(MyConfig).
            initialize();

        this.stage.addChild(new RobotlegsView());

        document.body.appendChild(this.renderer.view);

        this.render();
    }

    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    }
}
