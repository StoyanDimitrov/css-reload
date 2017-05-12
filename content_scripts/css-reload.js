'use strict'

browser.runtime.onMessage.addListener(message => {
  if (message.command !== 'css-reload') {
    return
  }

  let styles = window.document.querySelectorAll('link[rel=stylesheet][href]:not([data-autoreload=false])')
    , url

  Array.from(styles).map((link) => {
    url = new URL(link.href)
    url.searchParams.set('cacheBuster', Date.now())

    link.href = url.href
  })
})
