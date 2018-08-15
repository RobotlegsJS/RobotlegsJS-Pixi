// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, IConfig } from "@robotlegsjs/core";

import { IMediatorMap } from "../../src";

import { RobotlegsMediator } from "../mediator/RobotlegsMediator";
import { ChildMediator } from "../mediator/ChildMediator";

import { RobotlegsView } from "../view/RobotlegsView";
import { ChildView } from "../view/ChildView";

@injectable()
export class MyConfig implements IConfig {
    @inject(IMediatorMap)
    private mediatorMap: IMediatorMap;

    public configure(): void {
        this.mediatorMap.map(RobotlegsView).toMediator(RobotlegsMediator);
        this.mediatorMap.map(ChildView).toMediator(ChildMediator);
    }
}
