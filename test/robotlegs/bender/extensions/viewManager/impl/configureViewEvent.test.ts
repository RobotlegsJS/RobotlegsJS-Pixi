// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container } from "pixi.js";

import { ConfigureViewEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ConfigureViewEvent";

describe("ConfigureViewEvent", () => {
    let container: Container = null;
    let event: ConfigureViewEvent = null;

    beforeEach(() => {
        container = new Container();
        event = new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, container);
    });

    afterEach(() => {
        container = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(ConfigureViewEvent.CONFIGURE_VIEW, "configureView");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, ConfigureViewEvent.CONFIGURE_VIEW);
    });

    it("view_is_stored", () => {
        assert.equal(event.view, container);
    });

    it("event_is_cloned", () => {
        let clone: ConfigureViewEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.view, event.view);
        assert.notEqual(clone, event);
    });
});
