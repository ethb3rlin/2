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
 * Lightbox for the photo gallery on `photos.html`. Binds Magnific Popup
 * (`dist/jquery.magnific-popup.min.js`) to each day's grid with the options
 * the Divi theme passes on 2018.ethberlin.org, so the arrows step within one
 * day. The page loads this file as a module after jQuery and the plugin.
 * @module gallery
 */

/**
 * Magnific Popup options: Divi's options on 2018.ethberlin.org without
 * `removalDelay` and `mainClass`, which need Divi's own fade CSS, and without
 * `autoFocusLast: false`, so focus returns to the tile on close. Frozen;
 * Magnific Popup copies them before use.
 * @type {Readonly<{delegate: string, type: string, gallery: Readonly<{enabled: boolean, navigateByImgClick: boolean}>, zoom: Readonly<{enabled: boolean, duration: number}>}>}
 */
export const LIGHTBOX_OPTIONS = Object.freeze({
    delegate: "a",
    type: "image",
    gallery: Object.freeze({ enabled: true, navigateByImgClick: true }),
    zoom: Object.freeze({ enabled: true, duration: 500 }),
});

/**
 * The part of a jQuery collection this module calls.
 * @typedef {object} Collection
 * @property {number} length The number of elements in the collection.
 * @property {function(function(number, Element): void): *} each Calls its
 *     argument once for every element, with the index and the element.
 * @property {function(Object): *} magnificPopup Binds Magnific Popup to the
 *     elements.
 */

/**
 * The part of jQuery this module calls: a selector or an element in, a
 * collection out.
 * @typedef {function((string|Element)): Collection} JQueryLike
 */

/**
 * The part of `window` this module reads.
 * @typedef {object} PageWindow
 * @property {*} [jQuery] The page's jQuery, when it loaded. Magnific Popup
 *     adds `jQuery.fn.magnificPopup`.
 */

/**
 * Binds one Magnific Popup gallery to every element that matches `selector`,
 * so each day's grid steps through its own photos.
 * @param {JQueryLike} jQuery The page's jQuery, with Magnific Popup loaded.
 * @param {string} [selector] The grids to bind.
 * @returns {number} The number of grids bound.
 */
export function initGallery(jQuery, selector = ".photos-grid") {
    const grids = jQuery(selector);
    grids.each((_index, grid) => {
        jQuery(grid).magnificPopup(LIGHTBOX_OPTIONS);
    });
    return grids.length;
}

/**
 * Starts the lightbox when the page has jQuery with Magnific Popup. Without
 * them, for example when a script failed to load, the tiles stay plain links
 * to the original photos.
 * @param {unknown} win The page's `window`; `undefined` outside a browser.
 * @returns {boolean} Whether the lightbox was started.
 */
export function main(win) {
    const jQuery = /** @type {PageWindow | undefined} */ (win)?.jQuery;
    if (!jQuery?.fn?.magnificPopup) {
        return false;
    }
    initGallery(jQuery);
    return true;
}

main(globalThis.window);
