RobotlegsJS PixiJS Extension
===

[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://secure.travis-ci.org/RobotlegsJS/RobotlegsJS-Pixi.svg?branch=master)](https://travis-ci.org/RobotlegsJS/RobotlegsJS-Pixi)
[![Code Climate](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Pixi/badges/gpa.svg)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Pixi)
[![Test Coverage](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Pixi/badges/coverage.svg)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Pixi/coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fpixi.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fpixi)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Pixi.svg)](https://greenkeeper.io/)

Integrate [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
framework with [PixiJS](https://github.com/pixijs/pixi.js).

Usage
---

```ts
/// <reference path="node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import { Context, MVCSBundle } from "robotlegs";
import { PixiBundle ,ContextView } from "@robotlegsjs/pixi";

let context = new Context();
context.
  install( MVCSBundle, PixiBundle ).
  configure( new ContextView((<any>this.renderer).plugins.interaction) );
```

Running the example
---

Run the following commands to run the example:

```
npm install
npm start
```

License
---

[MIT](LICENSE)
