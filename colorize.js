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
 * @param {string} css
 */
const addGlobalStyle = css => {
  const head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  const style = document.createElement('style');
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle(`.${CLASS_NAME} {
  margin: 5px;
  border: 2px solid #fff;
}`)

const csscolors = [
"black",
"silver",
"gray",
"white",
"maroon",
"red",
"purple",
"fuchsia",
"green",
"lime",
"olive",
"yellow",
"navy",
"blue",
"teal",
"aqua",
"orange",
"aliceblue",
"antiquewhite",
"aquamarine",
"azure",
"beige",
"bisque",
"blanchedalmond",
"blueviolet",
"brown",
"burlywood",
"cadetblue",
"chartreuse",
"chocolate",
"coral",
"cornflowerblue",
"cornsilk",
"crimson",
"cyan",
"aqua",
"darkblue",
"darkcyan",
"darkgoldenrod",
"darkgray",
"darkgreen",
"darkgrey",
"darkkhaki",
"darkmagenta",
"darkolivegreen",
"darkorange",
"darkorchid",
"darkred",
"darksalmon",
"darkseagreen",
"darkslateblue",
"darkslategray",
"darkslategrey",
"darkturquoise",
"darkviolet",
"deeppink",
"deepskyblue",
"dimgray",
"dimgrey",
"dodgerblue",
"firebrick",
"floralwhite",
"forestgreen",
"gainsboro",
"ghostwhite",
"gold",
"goldenrod",
"greenyellow",
"grey",
"honeydew",
"hotpink",
"indianred",
"indigo",
"ivory",
"khaki",
"lavender",
"lavenderblush",
"lawngreen",
"lemonchiffon",
"lightblue",
"lightcoral",
"lightcyan",
"lightgoldenrodyellow",
"lightgray",
"lightgreen",
"lightgrey",
"lightpink",
"lightsalmon",
"lightseagreen",
"lightskyblue",
"lightslategray",
"lightslategrey",
"lightsteelblue",
"lightyellow",
"limegreen",
"linen",
"magenta",
"fuchsia",
"mediumaquamarine",
"mediumblue",
"mediumorchid",
"mediumpurple",
"mediumseagreen",
"mediumslateblue",
"mediumspringgreen",
"mediumturquoise",
"mediumvioletred",
"midnightblue",
"mintcream",
"mistyrose",
"moccasin",
"navajowhite",
"oldlace",
"olivedrab",
"orangered",
"orchid",
"palegoldenrod",
"palegreen",
"paleturquoise",
"palevioletred",
"papayawhip",
"peachpuff",
"peru",
"pink",
"plum",
"powderblue",
"rosybrown",
"royalblue",
"saddlebrown",
"salmon",
"sandybrown",
"seagreen",
"seashell",
"sienna",
"skyblue",
"slateblue",
"slategray",
"slategrey",
"snow",
"springgreen",
"steelblue",
"tan",
"thistle",
"tomato",
"turquoise",
"violet",
"wheat",
"whitesmoke",
"yellowgreen",
"rebeccapurple",
]


/**
 * @param {ElementCSSInlineStyle} elem
 * @param {string} color
 */
const setColor = (elem, color) => {
  const oldColor = elem.style.color
  elem.style.color = color
  const valid = o.style.color !== ''
  if (!valid) elem.style.color = oldColor
  return valid
}

/**
 * gets slices of string that are colors
 * @param {string} text
 * @returns {Array<[start: number, str: string]>} array of slices
 */
function colorSlices(text) {
  const hexRegex = /#([a-f\d]{6}|[a-f\d]{3}|[a-f\d]{8}|[a-f\d]{4})/ig
  const funcRegex = /(rgba?|hsla?)\(/ig
  const colorRegex = new RegExp(csscolors.join('|'), 'ig')

  const slices = []
  let match = /** @type {RegExpExecArray} */(null)
  while ((match = hexRegex.exec(text)) != null) {
    const startIdx = match.index
    const endIdx = hexRegex.lastIndex
    slices.push([startIdx, text.slice(startIdx, endIdx)])
  }

  match = null
  while ((match = funcRegex.exec(text)) != null) {
    const startIdx = match.index
    console.log('got slice starting at', startIdx)
    let endIdx = matchParen(text.substr(funcRegex.lastIndex), 1)
    if (endIdx !== -1) {
      endIdx += funcRegex.lastIndex + 1
      slices.push([startIdx, text.slice(startIdx, endIdx)])
    }
  }

  match = null
  while ((match = colorRegex.exec(text)) != null) {
    const startIdx = match.index
    const endIdx = colorRegex.lastIndex
    slices.push([startIdx, text.slice(startIdx, endIdx)])
  }

  return slices

  /**
   * @param {string} str
   * @param {number} stack
   */
  function matchParen(str, stack = 0) {
    let idx = 0
    for (const char of str) {
      if (char === '(') stack++
      else if (char === ')') stack--
      if (stack === 0) {
        return idx
      }
      idx++
    }
    return -1
  }
}

const docolorize = () => {
  const span = document.createElement('span');
  span.className = CLASS_NAME
  span.innerText = '■'

  if (window.self !== window.top) { return; }  // don't execute in a frame

  const theElems = document.evaluate(
      './/text()[normalize-space() != "" '
      + 'and not(ancestor::style) '
      + 'and not(ancestor::script) '
      + 'and not(ancestor::textarea)]',
      document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (let i = 0; i < theElems.snapshotLength; i++) {
    /** @type {Text} */
    const node = theElems.snapshotItem(i);

    for (const [start, str] of colorSlices(node.data)) {
      /** @type {HTMLSpanElement} */
      const sp = span.cloneNode(true)
      if (setColor(sp, str)) {
        const newTextNode = start !== 0 ? node.splitText(start) : node
        node.parentNode.insertBefore(sp, newTextNode)
      }
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
colorize()

unsafeWindow.colorize = colorize;
})();
