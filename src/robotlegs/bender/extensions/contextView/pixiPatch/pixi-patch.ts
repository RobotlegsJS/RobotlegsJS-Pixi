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


interface AddedEventEmitable {
    __addedEventEmited: boolean;
}

function isConnectedToStage(stage: PIXI.Container, object: PIXI.DisplayObject): boolean {
    if (object === stage) {
        return true;
    } else if (object.parent) {
        return isConnectedToStage(stage, object.parent);
    } else {
        return false;
    }
}

function addedEventAlreadyEmited(object: PIXI.DisplayObject): boolean {
    return (<any>object as AddedEventEmitable).__addedEventEmited;
}

function emitAddedEvent(stage: PIXI.Container, target: PIXI.DisplayObject): void {
    if (addedEventAlreadyEmited(target)) {
        return;
    }

    stage.emit("added", { target });
    (<any>target as AddedEventEmitable).__addedEventEmited = true;

    if (target instanceof PIXI.Container) {
        target.children.forEach(child => emitAddedEvent(stage, child));
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
            removeChild.call(this, child[i]);
            stage.emit("removed", { target: child[i] });
            (<any>child[i] as AddedEventEmitable).__addedEventEmited = false;
        }
        return child[0];
    };

    PIXI.Container.prototype.removeChildren = function(beginIndex: number = 0, endIndex?: number): PIXI.DisplayObject[] {
        let removedChildren = removeChildren.call(this, beginIndex, endIndex);

        for (let child of removedChildren) {
            stage.emit("removed", { target: child });
            (<any>child as AddedEventEmitable).__addedEventEmited = false;
        }

        return removedChildren;
    };

    PIXI.Container.prototype.removeChildAt = function(index): PIXI.DisplayObject {
        let child = removeChildAt.call(this, index);
        stage.emit("removed", { target: child });
        (<any>child as AddedEventEmitable).__addedEventEmited = false;
        return child;
    };
}
