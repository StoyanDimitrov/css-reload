function internalState()
{
  let integrations
    , activeTabId = null
    , defaultIntegrations = {
        hasPageAction: true,
        hasContextMenu: false,
        hasHotKey: true,
      }

  const isIntegrationEnabled = function (integration) {
    let enabled = false
    if (integration in integrations
      && integrations[integration] === true
    ) {
      enabled = true
    }

    return enabled
  }

  const setIntegrations = function (specs) {
    integrations = specs
  }

  const setIntegrationState = function (integration, isEnabled) {
    integrations[integration] = isEnabled
  }

  const getActiveTab = function () {
    return activeTabId
  }

  const setActiveTab = function (tabId) {
    activeTabId = tabId
  }

  const getDefaultIntegrations = function () {
    return defaultIntegrations
  }

  return Object.freeze({
    getDefaultIntegrations,
    setIntegrations,
    isIntegrationEnabled,
    setIntegrationState,
    getActiveTab,
    setActiveTab,
  })
}
