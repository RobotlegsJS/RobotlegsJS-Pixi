// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";

/**
 * @private
 */
export class NullMediatorUnmapper implements IMediatorUnmapper {
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public fromMediator(mediatorClass: IClass<any>): void {}

    /**
     * @private
     */
    public fromAll(): void {}
}
