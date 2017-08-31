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
  executeReloadCssScript(tab.id)
})

browser.contextMenus.create({
  id: "reloadCss",
  title: "Reloads the stylesheets",
  title: browser.i18n.getMessage("context_menu_title"),
  contexts: ["page"]
})

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "reloadCss"){
    executeReloadCssScript(tab.id)
  }
})

function executeReloadCssScript(tabId)
{
  browser.tabs.executeScript(tabId, {
    file: 'assets/css-reload.js'
  }).catch(err => {
    // mute permission errors
  })
}

function activateAction(tabId)
{
  browser.pageAction.show(tabId)
}