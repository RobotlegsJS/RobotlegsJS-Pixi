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
    addEventListener: function(
        event: string | symbol,
        listener: Function,
        context?: any
    ): void {
        this.on(event, listener, context);
    },

    hasEventListener: function(
        type: string | symbol,
        listener?: Function
    ): boolean {
        return this.listeners(type).length > 0;
    },

    removeEventListener: function(
        event: string | symbol,
        listener?: Function,
        context?: any,
        once?: boolean
    ): void {
        this.off(event, listener, context, once);
    },

    willTrigger: function(event: string | symbol): boolean {
        return this.hasEventListener(event);
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
