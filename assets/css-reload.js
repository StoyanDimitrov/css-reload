'use strict'

;(function() {
  const query = 'link[rel=stylesheet][href]:not([data-autoreload=false])'

  document.querySelectorAll(query)
    .forEach((link) => {
      const url = new URL(link.href)
      url.searchParams.set('cacheBuster', Date.now())

      link.href = url.href
  })
})()