robotlegs-pixi
===

Integrate [RobotlegsJS](https://github.com/goodgamestudios/RobotlegsJs)
framework with [PixiJS](https://github.com/pixijs/pixi.js).

Usage
---

```ts
/// <reference path="node_modules/robotlegs-pixi/definitions/pixi.d.ts" />

import { Context, MVCSBundle } from "robotlegs";
import { PixiExtension ,ContextView } from "robotlegs-pixi";

let context = new Context();
context.
  install( MVCSBundle, PixiExtension ).
  configure( new ContextView((<any>this.renderer).plugins.interaction) );
```


License
---

[MIT](LICENSE.md)
