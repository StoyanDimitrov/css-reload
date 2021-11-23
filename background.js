'use strict'

const STATE = internalState()

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
      STATE.setActiveTab(tab[0].id)

      managePageAction()
    })
})

browser.tabs.onActivated.addListener((active) => {
  STATE.setActiveTab(active.tabId)

  managePageAction()
})

browser.tabs.onUpdated.addListener((tabId, changed) => {
  STATE.setActiveTab(tabId)

  if (typeof changed.status !== 'undefined'
    && changed.status !== 'complete'
  ) {
    return
  }

  managePageAction()
})

browser.commands.onCommand.addListener((name) => {
  if (name !== 'reload-css'
    || ! STATE.isIntegrationEnabled('hasHotKey')
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
  Object.entries(change).map((integration) => {
    STATE.setIntegrationState(integration[0], integration[1].newValue)
  })

  managePageAction()
  manageContextMenu()
})


/**
 * Main extension purpose
 */
function main() {
  browser.tabs.executeScript(STATE.getActiveTab(), {
    file: 'assets/css-reload.js',
  }).catch(err => {
    // mute permission errors
  })
}

browser.storage.sync.get(STATE.getDefaultIntegrations())
  .then((items) => {
    STATE.setIntegrations(items)

    managePageAction()
    manageContextMenu()
  })

function managePageAction() {
  if (! STATE.getActiveTab()) {
    return
  }

  if (! STATE.isIntegrationEnabled('hasPageAction')) {
    browser.pageAction.hide(STATE.getActiveTab())
    return
  }

  browser.pageAction.show(STATE.getActiveTab())
}

function manageContextMenu() {
  if (! STATE.isIntegrationEnabled('hasContextMenu')) {
    browser.contextMenus.removeAll()
    return
  }

  browser.contextMenus.create({
    id: 'reloadCss',
    title: browser.i18n.getMessage('contextMenuItem'),
    contexts: ['all']
  })
}
