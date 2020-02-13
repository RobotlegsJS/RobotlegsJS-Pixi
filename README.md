# RobotlegsJS PixiJS Extension

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.com/RobotlegsJS/RobotlegsJS-Pixi.svg?branch=master)](https://travis-ci.com/RobotlegsJS/RobotlegsJS-Pixi)
[![codebeat badge](https://codebeat.co/badges/f9e9f52e-ddef-4f51-82b7-9e6a695474ab)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-pixi-master)
[![Test Coverage](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Pixi/badges/coverage.svg)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Pixi/coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fpixi.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fpixi)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Pixi.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Integrate [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
framework with [PixiJS](https://github.com/pixijs/pixi.js).

## Installation

+ Get `@robotlegsjs/pixi`

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/pixi --save
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/pixi
```

From version `0.2.0` of this package, the [PixiJS](https://github.com/pixijs/pixi.js) dependencies were moved to **peerDependencies**,
allowing the final user to choose the desired version of the `pixi.js` library on each project.

The `@robotlegsjs/pixi` package version `^2` is compatible with versions `^5` version range of `pixi.js` library.

+ For pixi.js 4

For pixi.js `>=4.2.1 <5`, please use `@robotlegsjs/pixi` versions `^1`.
```bash
yarn add @robotlegsjs/pixi@"^1.0.1"
```
Since each version of `pixi.js` 4 library defines which version of `eventemitter3` library is being used, remember to also install the proper version of `eventemitter3` in your project.

As example, when you would like to use the version `4.2.1` of `pixi.js` library, you can run:

```bash
npm install pixi.js@4.2.1 eventemitter3@^2.0.0 reflect-metadata --save
```

or

```bash
yarn add pixi.js@4.2.1 eventemitter3@^2.0.0 reflect-metadata
```

+ Setup of your project

Then follow the [installation instructions](https://github.com/RobotlegsJS/RobotlegsJS/blob/master/README.md#installation) of **RobotlegsJS** library to complete the setup of your project.

**Dependencies**

+ [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
+ [tslib](https://github.com/Microsoft/tslib)

**Peer Dependencies**

+ [PixiJS](https://github.com/pixijs/pixi.js)
+ [eventemitter3](https://github.com/primus/eventemitter3)
+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

## Usage

```typescript
import "reflect-metadata";

import * as PIXI from 'pixi.js';

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "@robotlegsjs/pixi";

import { MyConfig } from "./config/MyConfig";
import { RobotlegsView } from "./view/RobotlegsView";

export class Game {

    private canvas: HTMLCanvasElement;
    private stage: PIXI.Container;
    private renderer: PIXI.Renderer;
    private context: Context;

    constructor () {
        this.canvas = <HTMLCanvasElement>(document.getElementById("canvas"));
        this.renderer = PIXI.autoDetectRenderer({
            width: 960,
            height: 400,
            view: this.canvas,
            backgroundColor: 0xffffff
        });
        this.stage = new PIXI.Container();

        this.context = new Context();
        this.context.install(MVCSBundle, PixiBundle).
            configure(new ContextView(this.stage)).
            configure(MyConfig).
            initialize();

        this.stage.addChild(new RobotlegsView());

        document.body.appendChild(this.renderer.view);

        this.render();
    }

    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    }

}

let game: Game = new Game();

```

[See full example here](example/index.ts)

## Running the example

Run the following commands to run the example:

```bash
npm install
npm start
```

or:

```bash
yarn install
yarn start
```

## License

[MIT](LICENSE)
