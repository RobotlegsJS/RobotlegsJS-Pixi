// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
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
    addEventListener: function(type: string | symbol, listener: Function, context?: any): void {
        this.on(type, listener, context);
    },

    hasEventListener: function(type: string | symbol, listener?: Function): boolean {
        return this.listeners(type).length > 0;
    },

    removeEventListener: function(type: string | symbol, listener?: Function, context?: any, once?: boolean): void {
        this.off(type, listener, context, once);
    },

    willTrigger: function(type: string | symbol): boolean {
        return this.hasEventListener(type);
    },

    dispatchEvent: function(event: IEvent): void {
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
