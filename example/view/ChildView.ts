import { Container, Graphics } from "pixi.js";

export class ChildView extends Container {

    constructor () {
        super();

        let g = new Graphics();
        g.beginFill(0xff00ff);
        g.drawCircle(Math.random() * 800, Math.random() * 600, 50);

        this.addChild(g);
    }

}
