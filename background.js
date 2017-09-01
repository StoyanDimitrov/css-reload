'use strict'

var boo = {}

browser.tabs.onActivated.addListener((active) => {
  activateAction(active.tabId)
})

browser.tabs.onUpdated.addListener((tabId, changed) => {

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
console.log('boo', boo)

  if (! boo.hasPageAction) {
    browser.pageAction.hide(tabId)
    return
  }

  browser.pageAction.show(tabId)
}


browser.storage.sync.get({
  hasPageAction: true,
  hasContextMenu: false,
}).then(function(items) {
  boo = items

  if (items && items.hasContextMenu) {
    // createContextMenu()
  }
}).catch((err) => {
  console.log(err)
})

browser.storage.onChanged.addListener((change, area) => {
  console.log(change, area)
  const m = Object.keys(change)
  for (let l of m) {
console.log('change', l, change[l].newValue)
    boo[m] = change[l].newValue
  }
})