//
// Patch PIXI to emit "added"/"removed" events on global event dispatcher
//

import "./eventemitter3-patch";
import PIXI = require("pixi.js");

export function applyPixiPatch(interaction: any) {
    let addChild = PIXI.Container.prototype.addChild;
    let addChildAt = PIXI.Container.prototype.addChildAt;
    let removeChild = PIXI.Container.prototype.removeChild;
    let removeChildren = PIXI.Container.prototype.removeChildren;
    let removeChildAt = PIXI.Container.prototype.removeChildAt;

    PIXI.Container.prototype.addChild = function patchedAddChild<
        T extends PIXI.DisplayObject
    >(...child: T[]) {
        for (let i = 0, len = child.length; i < len; i++) {
            addChild.call(this, child[i]);
            interaction.emit("added", { target: child[i] });
        }
        return this;
    };

    PIXI.Container.prototype.addChildAt = function patchedAddChildAt<
        T extends PIXI.DisplayObject
    >(child: T, index: number): T {
        addChildAt.call(this, child, index);
        interaction.emit("added", { target: child });
        return this;
    };

    PIXI.Container.prototype.removeChild = function(
        ...child
    ): PIXI.DisplayObject {
        for (let i = 0, len = child.length; i < len; i++) {
            removeChild.call(this, child[i]);
            interaction.emit("removed", { target: child[i] });
        }
        return this;
    };

    PIXI.Container.prototype.removeChildren = function(
        beginIndex: number = 0,
        endIndex?: number
    ) {
        let removedChildren = removeChildren.call(this, beginIndex, endIndex);

        for (let child of removedChildren) {
            interaction.emit("removed", { target: child });
        }

        return removedChildren;
    };

    PIXI.Container.prototype.removeChildAt = function(
        index
    ): PIXI.DisplayObject {
        let child = removeChildAt.call(this, index);
        interaction.emit("removed", { target: child });
        return this;
    };
}
