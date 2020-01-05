// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * Patch PIXI.Container class to add implementation of contains method.
 */

import { Container, DisplayObject } from "pixi.js";

const ContainerMixin = {
    /**
     * Determines whether the specified child object is a child of the Container instance or the instance itself.
     * The search includes the entire display list including this Container instance.
     * Grandchildren, great-grandchildren, and so on each return true.
     *
     * @param child The child object to test.
     *
     * @return true if the child object is a child of the Container or the Container itself; otherwise false.
     *
     * @see {@link https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/DisplayObjectContainer.html#contains()}
     */
    contains(this: Container, child: DisplayObject): boolean {
        let found: boolean = false;
        if (this === child || this.children.indexOf(child) >= 0) {
            found = true;
        } else {
            for (let c of this.children) {
                if (c instanceof Container && c.contains(child)) {
                    found = true;
                    break;
                }
            }
        }
        return found;
    }
};

Object.assign(Container.prototype, ContainerMixin);
