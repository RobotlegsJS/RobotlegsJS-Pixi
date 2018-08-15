// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, Graphics } from "pixi.js";

export class CircleView extends Container {
    constructor() {
        super();

        let g = new Graphics();
        g.beginFill(0xffffff);
        g.drawCircle(Math.random() * 960, Math.random() * 400, 50);

        this.addChild(g);
    }
}
