// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
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

function isConnectedToStage(stage: PIXI.Container, object: PIXI.DisplayObject): boolean {
    if (object === stage) {
        return true;
    } else if (object.parent) {
        return isConnectedToStage(stage, object.parent);
    } else {
        return false;
    }
}

function emitAddedEvent(stage: PIXI.Container, target: PIXI.DisplayObject): void {
    stage.emit("added", { target });

    if (target instanceof PIXI.Container) {
        target.children.forEach(child => emitAddedEvent(stage, child));
    }
}

function emitRemovedEvent(stage: PIXI.Container, target: PIXI.DisplayObject): void {
    stage.emit("removed", { target });

    if (target instanceof PIXI.Container) {
        target.children.forEach(child => emitRemovedEvent(stage, child));
    }
}

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
            const object = arguments[i];
            addChild.call(this, object);

            if (isConnectedToStage(stage, object)) {
                emitAddedEvent(stage, object);
            }
        }
        return child;
    };

    PIXI.Container.prototype.addChildAt = function patchedAddChildAt<T extends PIXI.DisplayObject>(child: T, index: number): T {
        addChildAt.call(this, child, index);

        if (isConnectedToStage(stage, child)) {
            emitAddedEvent(stage, child);
        }

        return child;
    };

    PIXI.Container.prototype.removeChild = function(...child: PIXI.DisplayObject[]): PIXI.DisplayObject {
        for (let i = 0, len = child.length; i < len; i++) {
            if (isConnectedToStage(stage, child[i])) {
                emitRemovedEvent(stage, child[i]);
            }

            removeChild.call(this, child[i]);
        }

        return child[0];
    };

    PIXI.Container.prototype.removeChildren = function(beginIndex: number = 0, endIndex?: number): PIXI.DisplayObject[] {
        let removedChildren = removeChildren.call(this, beginIndex, endIndex);

        if (isConnectedToStage(stage, this) && removedChildren.length) {
            for (let child of removedChildren) {
                emitRemovedEvent(stage, child);
            }
        }

        return removedChildren;
    };

    PIXI.Container.prototype.removeChildAt = function(index): PIXI.DisplayObject {
        let child = removeChildAt.call(this, index);

        if (isConnectedToStage(stage, this) && child) {
            emitRemovedEvent(stage, child);
        }

        return child;
    };
}
