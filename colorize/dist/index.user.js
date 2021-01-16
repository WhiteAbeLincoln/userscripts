// ==UserScript==
// @name        colorize
// @namespace   https://github.com/WhiteAbeLincoln/userscripts
// @description Annotates css colors in the page text with their visual color
// @match       *://*/*
// @grant       none
// @version     0.0.1
// @author      WhiteAbeLincoln
// ==/UserScript==
!function(){"use strict";const e="aw-userscript-colorize",t=["black","silver","gray","white","maroon","red","purple","fuchsia","green","lime","olive","yellow","navy","blue","teal","aqua","orange","aliceblue","antiquewhite","aquamarine","azure","beige","bisque","blanchedalmond","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","gainsboro","ghostwhite","gold","goldenrod","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","limegreen","linen","magenta","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","oldlace","olivedrab","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","thistle","tomato","turquoise","violet","wheat","whitesmoke","yellowgreen","rebeccapurple"];function n(e,t){let n=-1;const r=[];for(;(n=e.indexOf(t,n+1))>=0;)r.push(n);return r}function r(e,t=0){let n=0;for(const r of e){if("("===r?t++:")"===r&&t--,0===t)return n;n++}return-1}function l(e){const l=/#([a-f\d]{6}|[a-f\d]{3}|[a-f\d]{8}|[a-f\d]{4})/gi,a=/(rgba?|hsla?)\(/gi,o=[];let s=
/** @type {RegExpExecArray} */
null;for(;null!=(s=l.exec(e));){const t=s.index,n=l.lastIndex;o.push({start:t,end:n,str:e.slice(t,n)})}for(s=null;null!=(s=a.exec(e));){const t=s.index;let n=r(e.substr(a.lastIndex),1);-1!==n&&(n+=a.lastIndex+1,o.push({start:t,end:n,str:e.slice(t,n)}))}for(const r of t){const t=n(e,r);o.push(...t.map((t=>({start:t,end:t+r.length,str:e.substr(t,r.length)}))))}return o}// indicates if x contains y
/**
 * filters all intervals which are completely contained by another interval
 */
function a(e){return e.filter(((t,n)=>!e.some(((e,r)=>n!==r&&((e,t)=>t.start>=e.start&&t.start<=e.end&&t.end>=e.start&&t.end<=e.end)(e,t)))))}function o(e,t){const n=e.style.color;e.style.color=t;const r=""!==e.style.color;return r||(e.style.color=n),r}function s(){const t=document.createElement("span");if(t.className=e,t.innerText="■",window.self!==window.top)return;// don't execute in a frame
const n=document.evaluate('.//text()[normalize-space() != "" and not(ancestor::style) and not(ancestor::script) and not(ancestor::textarea)]',document.body,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(let e=0;e<n.snapshotLength;e++){let r=n.snapshotItem(e),s=0;const i=a(l(r.data));i.sort(((e,t)=>e.start-t.start));for(const{start:e,str:n}of i){const l=t.cloneNode(!0);o(l,n)&&(r=0!==e?r.splitText(e-s):r,r.parentNode&&r.parentNode.insertBefore(l,r),s=e)}}}function i(){const t=document.getElementsByClassName(e),n=0!==t.length;for(;t.length>0;)t[0].parentNode&&t[0].parentNode.removeChild(t[0]);return n}function d(){i()||s()}d.do=s,d.undo=i,
// global CSS
unsafeWindow&&(unsafeWindow[e]=d);const u=document.createElement("style");u.innerHTML=`.${e} {\n  margin: 5px;\n}`,document.head.append(u)}();
