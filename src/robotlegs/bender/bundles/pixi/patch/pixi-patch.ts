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

import { Event } from "@robotlegsjs/core";

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
    target.dispatchEvent(new Event("addedToStage", true));

    if (target instanceof PIXI.Container) {
        target.children.forEach(child => emitAddedEvent(stage, child));
    }
}

function emitRemovedEvent(stage: PIXI.Container, target: PIXI.DisplayObject): void {
    target.dispatchEvent(new Event("removedFromStage", true));

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
        for (let i: number = 0, len: number = arguments.length; i < len; i++) {
            const object: PIXI.DisplayObject = arguments[i];
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
        for (let i: number = 0, len: number = child.length; i < len; i++) {
            if (isConnectedToStage(stage, child[i])) {
                emitRemovedEvent(stage, child[i]);
            }

            removeChild.call(this, child[i]);
        }

        return child[0];
    };

    PIXI.Container.prototype.removeChildren = function(beginIndex: number = 0, endIndex?: number): PIXI.DisplayObject[] {
        const begin: number = beginIndex;
        const end: number = typeof endIndex === "number" ? endIndex : this.children.length;
        const range: number = end - begin;

        if (isConnectedToStage(stage, this) && range > 0 && range <= end) {
            for (let i: number = begin; i < end; i++) {
                let child: PIXI.DisplayObject = this.getChildAt(i);
                emitRemovedEvent(stage, child);
            }
        }

        return removeChildren.call(this, beginIndex, endIndex);
    };

    PIXI.Container.prototype.removeChildAt = function(index): PIXI.DisplayObject {
        let child: PIXI.DisplayObject = this.getChildAt(index);

        if (isConnectedToStage(stage, this) && child) {
            emitRemovedEvent(stage, child);
        }

        return removeChildAt.call(this, index);
    };
}
