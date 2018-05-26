// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * Patch PIXI to:
 * - emit "added"/"removed" events on stage
 * - implement PIXI.Container.contains method
 */

import "./eventemitter3-patch";
import "./contains-patch";

import PIXI = require("pixi.js");

export function applyPixiPatch(stage: PIXI.Container) {
    let addChild = PIXI.Container.prototype.addChild;
    let addChildAt = PIXI.Container.prototype.addChildAt;
    let removeChild = PIXI.Container.prototype.removeChild;
    let removeChildren = PIXI.Container.prototype.removeChildren;
    let removeChildAt = PIXI.Container.prototype.removeChildAt;

    PIXI.Container.prototype.addChild = function patchedAddChild<T extends PIXI.DisplayObject>(
        child: T,
        ...additionalChildren: PIXI.DisplayObject[]
    ): T {
        for (let i = 0, len = arguments.length; i < len; i++) {
            addChild.call(this, arguments[i]);
            stage.emit("added", { target: arguments[i] });
        }
        return child;
    };

    PIXI.Container.prototype.addChildAt = function patchedAddChildAt<T extends PIXI.DisplayObject>(child: T, index: number): T {
        addChildAt.call(this, child, index);
        stage.emit("added", { target: child });
        return child;
    };

    PIXI.Container.prototype.removeChild = function(...child: PIXI.DisplayObject[]): PIXI.DisplayObject {
        for (let i = 0, len = child.length; i < len; i++) {
            removeChild.call(this, child[i]);
            stage.emit("removed", { target: child[i] });
        }
        return child[0];
    };

    PIXI.Container.prototype.removeChildren = function(beginIndex: number = 0, endIndex?: number): PIXI.DisplayObject[] {
        let removedChildren = removeChildren.call(this, beginIndex, endIndex);

        for (let child of removedChildren) {
            stage.emit("removed", { target: child });
        }

        return removedChildren;
    };

    PIXI.Container.prototype.removeChildAt = function(index): PIXI.DisplayObject {
        let child = removeChildAt.call(this, index);
        stage.emit("removed", { target: child });
        return child;
    };
}
