// ==UserScript==
// @name    Color Highlighter
// @description Highlights css compatible colors (rgb and hex) on the webpage
// @include /^https?://.*/
// @namespace   whiteabelincoln
// @author      whiteabelincoln
// @version     1.0
// ==/UserScript==

(function() {
'use strict';

var hex = new RegExp(/#([a-f\d]{6}|[a-f\d]{3})(?=[\s])?/ig);
var rgb = new RegExp(/rgb(?:a)?\((\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b[, ]*){3,4}\)/ig);
var span = document.createElement('span');

if (window.self !== window.top) { return; }  // don't execute in a frame

var theElems = document.evaluate(
                './/text()[normalize-space() != "" '
                + 'and not(ancestor::style) '
                + 'and not(ancestor::script) '
                + 'and not(ancestor::textarea)]',
                document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (!theElems.snapshotItem(0)) { return; }      // end execution if no elements found

for (var i = 0; i < theElems.snapshotLength; i++) {
    var node = theElems.snapshotItem(i);
    
    //console.log("testing node " + i);
    //console.log(node);
    
    if (hex.test(node.nodeValue)) {
        //console.log("found node");
        //console.log(node);
        
        var sp = span.cloneNode(true);
        sp.innerHTML = node.nodeValue.replace(hex, '<span style="background-color: $&">$&</span>');
        node.parentNode.replaceChild(sp, node);
    } else if (rgb.test(node.nodeValue)) {
        var sp = span.cloneNode(true);
        sp.innerHTML = node.nodeValue.replace(rgb, '<span style="background-color: $&">$&</span>');
        node.parentNode.replaceChild(sp, node);
    }
}

})();
