// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * Patch PIXI event handling.
 *
 * - Proxy PIXI events to be compatible with EventDispatcher
 * - Implements event bubbling on `dispatchEvent` when `bubbles` is true.
 */

import { DisplayObject } from "pixi.js";
import { EventEmitter } from "eventemitter3";
import { IEvent } from "@robotlegsjs/core";

const EventDispatcherMixin = {
    addEventListener(type: string, listener: Function, context?: any, useCapture?: boolean, priority?: number): void {
        this.on(type, listener, context);
    },

    hasEventListener(type: string): boolean {
        return this.listeners(type).length > 0;
    },

    removeEventListener(type: string, listener: Function, context?: any, useCapture?: boolean): void {
        this.off(type, listener, context);
    },

    willTrigger(type: string): boolean {
        return this.hasEventListener(type);
    },

    dispatchEvent(event: IEvent): void {
        event.target = this;

        let currentTarget = this;
        do {
            event.currentTarget = currentTarget;
            event.currentTarget.emit(event.type, event);
            currentTarget = currentTarget.parent;
        } while (currentTarget && event.bubbles);
    }
};

Object.assign(DisplayObject.prototype, EventDispatcherMixin);
Object.assign(EventEmitter.prototype, EventDispatcherMixin);
