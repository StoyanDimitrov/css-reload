'use strict'

// TODO get rid of globals
var state = {}
  , currentTabId = null

/**
 * Event listeners
 */
browser.tabs.onActivated.addListener((active) => {
  currentTabId = active.tabId

  managePageAction()
})

browser.tabs.onUpdated.addListener((tabId, changed) => {
  currentTabId = tabId

  if (changed.status
    && changed.status !== 'complete'
  ) {
    return
  }

  managePageAction()
})

browser.commands.onCommand.addListener((name) => {
  if (name !== 'reload-css'
    || ! state.hasHotKey
  ) {
    return
  }

  main()
})

browser.pageAction.onClicked.addListener((tab) => {
  main()
})

browser.contextMenus.onClicked.addListener((info, tab) => {
  main()
})

browser.storage.onChanged.addListener((change, area) => {
  Object.entries(change).map((entry) => {
    state[entry[0]] = entry[1].newValue
  })

  managePageAction()
  manageContextMenu()
})


/**
 * Main extension purpose
 */
function main()
{
  browser.tabs.executeScript(currentTabId, {
    file: 'assets/css-reload.js'
  }).catch(err => {
    // mute permission errors
  })
}

browser.storage.sync.get(defaultSettings)
  .then((items) => {
    state = items

    manageContextMenu()
    managePageAction()
  })

function managePageAction()
{
  if (! state.hasPageAction) {
    browser.pageAction.hide(currentTabId)
    return
  }

  browser.pageAction.show(currentTabId)
}

function manageContextMenu()
{
  if (! state.hasContextMenu) {
    browser.contextMenus.removeAll()
    return
  }

  browser.contextMenus.create({
    id: 'reloadCss',
    title: browser.i18n.getMessage('contextMenuItem'),
    contexts: ['all']
  })
}
