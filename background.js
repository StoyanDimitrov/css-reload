'use strict'

browser.tabs.onActivated.addListener(active => {
  browser.pageAction.show(active.tabId)
})

browser.pageAction.onClicked.addListener(tab => {
  browser.tabs.executeScript(tab.id, {
    file: 'assets/css-reload.js'
  }).catch(err => {
    // mute permission errors
  })
})
