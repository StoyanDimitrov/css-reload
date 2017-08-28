'use strict'

browser.tabs.onActivated.addListener((active) => {
  activateAction(active.tabId)
})

browser.tabs.onUpdated.addListener((tabId, changed) => {

  browser.pageAction.hide(tabId)

  if (changed.status
    && changed.status !== 'complete'
  ) {
    return
  }

  activateAction(tabId)
})

browser.pageAction.onClicked.addListener((tab) => {
  browser.tabs.executeScript(tab.id, {
    file: 'assets/css-reload.js'
  }).catch(err => {
    // mute permission errors
  })
})


function activateAction(tabId)
{
  browser.pageAction.show(tabId)
}