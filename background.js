'use strict'

// TODO get rid of globals
var state = {}
  , activeTabId = null

/**
 * Event listeners
 */
browser.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === browser.windows.WINDOW_ID_NONE) {
    return
  }

  browser.tabs.query({
    active: true,
    windowId: windowId,
  })
    .then((tab) => {
      activeTabId = tab[0].id

      managePageAction()
    })
})

browser.tabs.onActivated.addListener((active) => {
  activeTabId = active.tabId

  managePageAction()
})

browser.tabs.onUpdated.addListener((tabId, changed) => {
  activeTabId = tabId

  if (typeof changed.status !== 'undefined'
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
  browser.tabs.executeScript(activeTabId, {
    file: 'assets/css-reload.js',
  }).catch(err => {
    // mute permission errors
  })
}

browser.storage.sync.get(defaultSettings)
  .then((items) => {
    state = items

    managePageAction()
    manageContextMenu()
  })

function managePageAction()
{
  if (! activeTabId) {
    return
  }

  if (! state.hasPageAction) {
    browser.pageAction.hide(activeTabId)
    return
  }

  browser.pageAction.show(activeTabId)
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
