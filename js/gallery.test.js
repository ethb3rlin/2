// SPDX-FileCopyrightText: 2026 Department of Decentralization
// SPDX-License-Identifier: MIT
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/**
 * Unit tests for `js/gallery.js`. Run with `npm test`.
 * @module gallery.test
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { initGallery, LIGHTBOX_OPTIONS, main } from "./gallery.js";

/**
 * A stand-in for jQuery over a list of fake grid elements. It records the
 * selectors it is called with and every `magnificPopup` call.
 * @param {object[]} grids The elements a selector call finds.
 * @param {boolean} [plugin] Whether Magnific Popup is loaded.
 * @returns {{jQuery: Function, bound: {element: object, options: object}[], selectors: string[]}}
 *     The stand-in and its records.
 */
function fakeJQuery(grids, plugin = true) {
    const bound = [];
    const selectors = [];
    const wrap = (elements) => ({
        length: elements.length,
        each(callback) {
            for (const [index, element] of elements.entries()) {
                callback(index, element);
            }
            return this;
        },
        magnificPopup(options) {
            for (const element of elements) {
                bound.push({ element, options });
            }
            return this;
        },
    });
    const jQuery = (selector) => {
        if (typeof selector === "string") {
            selectors.push(selector);
            return wrap(grids);
        }
        return wrap([selector]);
    };
    jQuery.fn = plugin ? { magnificPopup() {} } : {};
    return { jQuery, bound, selectors };
}

test("LIGHTBOX_OPTIONS are Divi's options minus three", () => {
    assert.deepEqual(LIGHTBOX_OPTIONS, {
        delegate: "a",
        type: "image",
        gallery: { enabled: true, navigateByImgClick: true },
        zoom: { enabled: true, duration: 500 },
    });
});

test("LIGHTBOX_OPTIONS and their nested objects are frozen", () => {
    assert.ok(Object.isFrozen(LIGHTBOX_OPTIONS));
    assert.ok(Object.isFrozen(LIGHTBOX_OPTIONS.gallery));
    assert.ok(Object.isFrozen(LIGHTBOX_OPTIONS.zoom));
});

test("initGallery binds one lightbox to each day's grid", () => {
    const grids = [{ day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }];
    const { jQuery, bound, selectors } = fakeJQuery(grids);
    assert.equal(initGallery(jQuery), 4);
    assert.deepEqual(selectors, [".photos-grid"]);
    assert.deepEqual(
        bound.map((call) => call.element),
        grids,
    );
    for (const call of bound) {
        assert.equal(call.options, LIGHTBOX_OPTIONS);
    }
});

test("initGallery takes another selector", () => {
    const { jQuery, bound, selectors } = fakeJQuery([{ day: 1 }]);
    assert.equal(initGallery(jQuery, ".other"), 1);
    assert.deepEqual(selectors, [".other"]);
    assert.equal(bound.length, 1);
});

test("initGallery binds nothing when no grid matches", () => {
    const { jQuery, bound } = fakeJQuery([]);
    assert.equal(initGallery(jQuery), 0);
    assert.equal(bound.length, 0);
});

test("main starts the lightbox with jQuery and Magnific Popup", () => {
    const { jQuery, bound } = fakeJQuery([{ day: 1 }, { day: 2 }]);
    assert.equal(main({ jQuery }), true);
    assert.equal(bound.length, 2);
});

test("main leaves plain links without a window, jQuery or the plugin", () => {
    const { jQuery, bound } = fakeJQuery([{ day: 1 }], false);
    assert.equal(main(undefined), false);
    assert.equal(main({}), false);
    assert.equal(main({ jQuery }), false);
    assert.equal(bound.length, 0);
});

test("importing the module outside a browser starts nothing", () => {
    assert.equal(globalThis.window, undefined);
    assert.equal(main(globalThis.window), false);
});
