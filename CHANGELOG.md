# RobotlegsJS Pixi Changelog:

## Robotlegs-Pixi 1.0.0

### v1.0.0 - Planned stable version

- [ ] Add instructions of how to install the **@robotlegsjs/pixi** package into **README.md**.

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [ ] Evaluate if **IMediator** interface should be mandatory.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

- [ ] Improve Code Coverage to reach 100%.

- [ ] Migrate [original documentation](https://github.com/robotlegs/robotlegs-framework/blob/master/src/readme.md) and adapt it to TypeScript and Pixi.

## Robotlegs-Pixi 0.1.0

### v0.1.3

- Update @robotlegsjs/core to version 0.1.3 (see #52).

- Update eventemitter3 to version 3.1.0 (see #52).

- Update pixi.js to version 4.7.3 (see #52).

- Update TypeScript Compiler Options (see #57).

- Update codeclimate config to version 2 (see #56).

- Use `rimraf` instead of `rm -rf` (see #55).

- Update Prettier rules (see #54).

- Update dev dependencies to latest version.

### [v0.1.2](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.1.2) - 2017-11-23

- Add ContextView handler (see #35).

- Update README (see #36).

- Update dev dependencies to latest version (see #36).

### [v0.1.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.1.1) - 2017-11-20

- Update pixi.js to version 4.6.1 (see #33).

- Validate IContextView on extensions that depend on it (see #34).

- Update dev dependencies to latest version.

### [v0.1.0](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.1.0) - 2017-11-13

Major Breaking Changes:
---

- View property in **IContextView** is a **PIXI.Container** (see #26).

- ContextView is initialised with a reference to the stage (see #26).

- Helper methods on **Mediator** class are updated (see #26).

- Internal dependencies to PIXI are explicit (see #26).

- Fix patch for PIXI and add contains method (see #26).

- StageSyncExtension class is removed (see #26).

- Map methods are used properly (see #26).

- RobotlegsJS/Core is migrated to version 0.1.1 (see #26 and #31).

Features Or Improvements:
---

- Improve Code Coverage and Fix Bugs (see #26).

- Add changelog (see #27).

- Add code of conduct (see #28).

- Add issue template (see #29).

- Add pull request template (see #30).

- Update dev dependencies to latest version.

## Robotlegs-Pixi 0.0.1

### [v0.0.6](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.6) - 2017-10-18

- Clean mediators array in MediatorFactory (see #14).

- Revert Map changes (see #22).

- Update dev dependencies to latest version.

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.5) - 2017-10-11

- Improve code coverage of ContainerRegistry (see #17).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.4) - 2017-09-26

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #7).

- Use Map methods properly (see #8).

- Update @robotlegsjs/core to version 0.0.6 (see #10).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.3) - 2017-09-15

- Update @robotlegsjs/core to version 0.0.5 (see #4).

- Update TSLint rules (see #5).

- Add support to [Prettier](https://prettier.io) code formatter (see #5).

- Add integration with [CodeBeat](https://codebeat.co) (see #5).

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.2) - 2017-08-30

- Update @robotlegsjs/core to version 0.0.4 (see #3).

- Enable GreenKeeper.

- Update README.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.1) - 2017-08-12

- Project moved to it's own organization and renamed to [**@robotlegsjs/pixi**](https://www.npmjs.com/package/@robotlegsjs/pixi).

- The version **0.0.1** is compatible to version **1.0.0** of [**robotlegs-pixi**](https://www.npmjs.com/package/robotlegs-pixi) package.

- For the changelog of older versions, check the log of previous [releases](https://github.com/GoodgameStudios/RobotlegsJS-Pixi/releases).
