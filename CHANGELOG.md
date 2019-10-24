# RobotlegsJS Pixi Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Suggestions or improvements for further versions

- [x] Add instructions of how to install the **@robotlegsjs/pixi** package into **README.md**.

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [ ] Evaluate if **IMediator** interface should be mandatory.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

- [ ] Improve Code Coverage to reach 100%.

- [ ] Migrate [original documentation](https://github.com/robotlegs/robotlegs-framework/blob/master/src/readme.md) and adapt it to TypeScript and Pixi.

## [Unreleased]

<!--
Types of changes:

#### Added
- for new features.

#### Changed
- for changes in existing functionality.

#### Deprecated
- for soon-to-be removed features.

#### Removed
- for now removed features.

#### Fixed
- for any bug fixes.

#### Security
- in case of vulnerabilities.
-->

## Robotlegs-Pixi 1.0.0

### [v1.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/1.0.1) - 2019-10-24

#### Changed

- Update `@robotlegsjs/core` to version `1.0.3` (see #117).

- Update `pixi.js` to version `4.8.8`.

- Remove `instanbul` dependency (see #116).

- Improve `prettier` rules and `autoformat` script (see #105).

- Enable `"editor.formatOnSave"` rule for `VS Code` (see #105).

- Migrate project to `travis-ci.com`.

- Update `codebeat` Project UUID.

- Update dev dependencies to latest version.

### [v1.0.0](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/1.0.0) - 2018-11-25

#### Changed

- Update `@robotlegsjs/core` to version `1.0.0` (see #97).

- Update `karma` setup to generate code coverage report only for `src` folder (see #77).

- Improve `webpack` configuration used to run example project. The `npm start` script will generate hashed files (to avoid browser cache) and open the broswer automatically (see #78).

- Migrate to Headless Chrome and improve performance of `karma` (see #93).

- Prepare package for stable version (see #94).

- Update GitHub Templates (see #96).

- Update dev dependencies to latest version.

## Robotlegs-Pixi 0.2.0

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.2.0) - 2018-08-02

#### Changed

- Update `@robotlegsjs/core` to version `0.2.0` (see #74).

- Move `pixi.js` and `eventemitter3` libraries to **peerDependencies** (see #76).

- Enforce TSLint rules (see #58).

- Update TypeScript Compiler Options (see #57, #71).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see #71).

- Update codeclimate config to version 2 (see #56).

- Use `rimraf` instead of `rm -rf` (see #55).

- Update Prettier rules (see #54).

- Adopts year-agnostic copyright message (see #70).

- Update dev dependencies to latest version.

#### Fixed

- Fix example (see #60).

- Only dispatch `added` or `removed` events when view is related to current stage (see #67, #68, #72).

## Robotlegs-Pixi 0.1.0

### [v0.1.2](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.1.2) - 2017-11-23

#### Added

- Add `ContextView` handler (see #35).

#### Changed

- Update README (see #36).

- Update dev dependencies to latest version (see #36).

### [v0.1.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.1.1) - 2017-11-20

#### Changed

- Update `pixi.js` to version `4.6.1` (see #33).

- Validate `IContextView` on extensions that depend on it (see #34).

- Update dev dependencies to latest version.

### [v0.1.0](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.1.0) - 2017-11-13

#### Added

- Add changelog (see #27).

- Add code of conduct (see #28).

- Add issue template (see #29).

- Add pull request template (see #30).

#### Changed

- View property in **IContextView** is a **PIXI.Container** (see #26).

- `ContextView` is initialised with a reference to the stage (see #26).

- Helper methods on **Mediator** class are updated (see #26).

- Internal dependencies to PIXI are explicit (see #26).

- Map methods are used properly (see #26).

- RobotlegsJS/Core is migrated to version 0.1.1 (see #26 and #31).

- Improve Code Coverage and Fix Bugs (see #26).

- Update dev dependencies to latest version.

#### Removed

- `StageSyncExtension` class is removed (see #26).

#### Fixed

- Fix patch for PIXI and add contains method (see #26).

## Robotlegs-Pixi 0.0.1

### [v0.0.6](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.6) - 2017-10-18

#### Changed

- Clean mediators array in `MediatorFactory` (see #14).

- Revert Map changes (see #22).

- Update dev dependencies to latest version.

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.5) - 2017-10-11

#### Changed

- Improve code coverage of ContainerRegistry (see #17).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.4) - 2017-09-26

#### Changed

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #7).

- Use Map methods properly (see #8).

- Update `@robotlegsjs/core` to version `0.0.6` (see #10).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.3) - 2017-09-15

#### Added

- Add support to [Prettier](https://prettier.io) code formatter (see #5).

- Add integration with [CodeBeat](https://codebeat.co) (see #5).

#### Changed

- Update `@robotlegsjs/core` to version `0.0.5` (see #4).

- Update TSLint rules (see #5).

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.2) - 2017-08-30

#### Changed

- Update `@robotlegsjs/core` to version `0.0.4` (see #3).

- Enable GreenKeeper.

- Update README.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi/releases/tag/0.0.1) - 2017-08-12

- Project moved to it's own organization and renamed to [**@robotlegsjs/pixi**](https://www.npmjs.com/package/@robotlegsjs/pixi).

- The version **0.0.1** is compatible to version **1.0.0** of [**robotlegs-pixi**](https://www.npmjs.com/package/robotlegs-pixi) package.

- For the changelog of older versions, check the log of previous [releases](https://github.com/GoodgameStudios/RobotlegsJS-Pixi/releases).
