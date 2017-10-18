'use strict'

let ts = Date.now();
function addTs(href) {
    const url = new URL(href)
    url.searchParams.set('cacheBuster', Date.now())
    return url.href;
}

Array
  .from(window.document.querySelectorAll('link[rel=stylesheet][href]:not([data-autoreload=false])'))
  .map((el) => el.href = addTs(el.href));

Array
  .from(window.document.querySelectorAll('img[src]'))
  .map((el) => el.src = addTs(el.src));
