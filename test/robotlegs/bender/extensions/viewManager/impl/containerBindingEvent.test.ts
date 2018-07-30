// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { ContainerBindingEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerBindingEvent";

describe("ContainerBindingEvent", () => {
    let event: ContainerBindingEvent = null;

    beforeEach(() => {
        event = new ContainerBindingEvent(ContainerBindingEvent.BINDING_EMPTY);
    });

    afterEach(() => {
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(ContainerBindingEvent.BINDING_EMPTY, "bindingEmpty");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, ContainerBindingEvent.BINDING_EMPTY);
    });

    it("event_is_cloned", () => {
        let clone: ContainerBindingEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.notEqual(clone, event);
    });
});
