// ==UserScript==
// @name        Colorize
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      WhiteAbeLincoln
// @description 1/11/2021, 12:16:14 PM
// ==/UserScript==

(function() {
'use strict';

const CLASS_NAME = 'aw-usercript-colorize'

/**
 * tests whether a color is valid
 * @type {(text: string) => boolean}
 */
const isValidColor = (() => {
  const o = new Option()
  return text => {
    o.style.color = text
    const valid = o.style.color !== ''
    o.style.color = ''
    return valid
  }
})()

const docolorize = () => {
  const span = document.createElement('span');
  span.className = CLASS_NAME
  span.innerText = '&nbsp;■&nbsp;'

  if (window.self !== window.top) { return; }  // don't execute in a frame

  const theElems = document.evaluate(
      './/text()[normalize-space() != "" '
      + 'and not(ancestor::style) '
      + 'and not(ancestor::script) '
      + 'and not(ancestor::textarea)]',
      document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (let i = 0; i < theElems.snapshotLength; i++) {
      let node = theElems.snapshotItem(i);

      if (isValidColor(node.nodeValue)) {
        /** @type {HTMLSpanElement} */
        const sp = span.cloneNode(true)
        sp.style = `background-color: #fff; color: ${node.nodeValue}`
        node.parentNode.insertBefore(sp, node.nextSibling)
      }
  }
};

const uncolorize = () => {
  const elements = document.getElementsByClassName(CLASS_NAME)
  while(elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

const colorize = () => {
  uncolorize()
  docolorize()
}
colorize.undo = uncolorize
colorize.do = docolorize

unsafeWindow.colorize = colorize;
})();
