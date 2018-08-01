// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ITypeFilter } from "@robotlegsjs/core";

import { IMediatorMapping } from "../api/IMediatorMapping";
import { IMediatorConfigurator } from "../dsl/IMediatorConfigurator";

/**
 * @private
 */
export class MediatorMapping implements IMediatorMapping, IMediatorConfigurator {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _matcher: ITypeFilter;

    /**
     * @inheritDoc
     */
    public get matcher(): ITypeFilter {
        return this._matcher;
    }

    private _mediatorClass: IClass<any>;

    /**
     * @inheritDoc
     */
    public get mediatorClass(): IClass<any> {
        return this._mediatorClass;
    }

    private _guards: any[] = [];

    /**
     * @inheritDoc
     */
    public get guards(): any[] {
        return this._guards;
    }

    private _hooks: any[] = [];

    /**
     * @inheritDoc
     */
    public get hooks(): any[] {
        return this._hooks;
    }

    private _autoRemoveEnabled: boolean = true;

    /**
     * @inheritDoc
     */
    public get autoRemoveEnabled(): boolean {
        return this._autoRemoveEnabled;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(matcher: ITypeFilter, mediatorClass: IClass<any>) {
        this._matcher = matcher;
        this._mediatorClass = mediatorClass;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public withGuards(...guards: any[]): IMediatorConfigurator {
        this._guards = this._guards.concat.apply(this._guards, guards);
        return this;
    }

    /**
     * @inheritDoc
     */
    public withHooks(...hooks: any[]): IMediatorConfigurator {
        this._hooks = this._hooks.concat.apply(this._hooks, hooks);
        return this;
    }

    /**
     * @inheritDoc
     */
    public autoRemove(value: boolean = true): IMediatorConfigurator {
        this._autoRemoveEnabled = value;
        return this;
    }
}
