import {
    inject,
    injectable,
    IConfig,
    IInjector
} from "robotlegs";

import { CircleMediator } from "../view/CircleMediator";
import { CircleView } from "../view/CircleView";
import { IMediatorMap } from "../../src/index";

@injectable()
export class MyConfig implements IConfig {

    @inject(IInjector)
    injector: IInjector;

    @inject(IMediatorMap)
    mediatorMap: IMediatorMap;

    configure () {
        this.mediatorMap.map(CircleView).toMediator(CircleMediator);
    }

}
