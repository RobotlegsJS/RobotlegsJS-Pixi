import { Container, Graphics } from "pixi.js";

export class CircleView extends Container {
    constructor() {
        super();

        let g = new Graphics();
        g.beginFill(0xffffff);
        g.drawCircle(Math.random() * 800, Math.random() * 600, 50);

        this.addChild(g);
    }
}
