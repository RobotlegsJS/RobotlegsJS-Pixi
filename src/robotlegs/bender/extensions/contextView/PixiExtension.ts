import { IBundle, IContext } from "robotlegs";

import { ContextViewExtension } from "./ContextViewExtension";

export class PixiExtension implements IBundle {

    public extend(context: IContext): void {
        context.install(ContextViewExtension);
    }

}
