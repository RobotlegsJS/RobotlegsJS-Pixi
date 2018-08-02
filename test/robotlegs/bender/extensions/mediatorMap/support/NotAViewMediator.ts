// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "@robotlegsjs/core";

import { MediatorWatcher } from "./MediatorWatcher";
import { NotAView } from "./NotAView";

@injectable()
export class NotAViewMediator {
    @inject(MediatorWatcher)
    public mediatorWatcher: MediatorWatcher;

    @inject(NotAView)
    public view: NotAView;

    public initialize(): void {
        this.view.mediatorName = "NotAViewMediator";
        this.mediatorWatcher.notify("NotAViewMediator");
    }

    public destroy(): void {
        this.mediatorWatcher.notify("NotAViewMediator destroy");
    }
}
