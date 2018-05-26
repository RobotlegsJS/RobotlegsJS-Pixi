import { inject, injectable, IConfig } from "@robotlegsjs/core";

import { CircleMediator } from "../view/CircleMediator";
import { CircleView } from "../view/CircleView";
import { ChildMediator } from "../view/ChildMediator";
import { ChildView } from "../view/ChildView";
import { IMediatorMap } from "../../src/index";

@injectable()
export class MyConfig implements IConfig {
    @inject(IMediatorMap) private mediatorMap: IMediatorMap;

    public configure(): void {
        this.mediatorMap.map(CircleView).toMediator(CircleMediator);
        this.mediatorMap.map(ChildView).toMediator(ChildMediator);
    }
}
