'use strict'

Array
  .from(window.document.querySelectorAll('link[rel=stylesheet][href]:not([data-autoreload=false])'))
  .map((link) => {
    const url = new URL(link.href)
    url.searchParams.set('cacheBuster', Date.now())

    link.href = url.href
  })
