const IntegrationPageAction = {
  el: document.getElementById('has-page-action'),
  prop: 'checked',
  key: 'hasPageAction',
}

const IntegrationContextMenu = {
  el: document.getElementById('has-context-menu'),
  prop: 'checked',
  key: 'hasContextMenu',
}

const IntegrationHotKey = {
  el: document.getElementById('has-hot-key'),
  prop: 'checked',
  key: 'hasHotKey',
  cb: 'toggleHotKeyChange',
}

const HotKeyReloadCss = {
  el: document.getElementById('hot-key-value'),
  prop: 'value',
  name: 'reload-css',
}

const HotKeyReloadCssSave = {
  el: document.getElementById('hot-key-change'),
  key: HotKeyReloadCss,
  cb: 'hotkeySave',
}

const HotKeyReloadCssReset = {
  el: document.getElementById('hot-key-reset'),
  key: HotKeyReloadCss,
  cb: 'hotkeyReset',
}

function Options()
{
  this.integrations = [
    IntegrationPageAction,
    IntegrationContextMenu,
    IntegrationHotKey,
  ]

  this.hotkeys = [
    HotKeyReloadCss,
  ]

  this.buttons = [
    HotKeyReloadCssSave,
    HotKeyReloadCssReset,
  ]

  this.callbacks = {
    hotkeySave: (name, value) => {
      browser.commands.update({
        name: name,
        shortcut: value
      })
    },

    hotkeyReset: (name) => {
      browser.commands.reset(name)
      this.init()
    },

    toggleHotKeyChange: (value) => {
      const action = {
        true: 'setAttribute',
        false: 'removeAttribute'
      }

      Array.from(document.querySelectorAll('[data-section="hot-key-change"] input, [data-section="hot-key-change"] button')).map((item) => {
        if (value) {
          item.removeAttribute('disabled')
        } else {
          item.setAttribute('disabled', 'disabled')
        }
      })
    }
  }

}

Options.prototype.init = function OptionsInit() {
  // initiate integration values
  browser.storage.sync.get(defaultSettings)
    .then((branch) => {
      if (Object.keys(branch) === 0) {
        return this
      }

      this.integrations.map((item) => {
        item.el[item.prop] = branch[item.key]

        // run the callback if any
        if ('cb' in item) {
          this.callbacks[item.cb](item.el[item.prop])
        }
      })
    })

  // populate hotkey values
  browser.commands.getAll()
    .then((commands) => {
      commands.forEach((command) => {
        this.hotkeys.map((key) => {
          if (key.name !== command.name) {
            return
          }

          key.el.value = command.shortcut
        })
      })
    })

  return this
}

Options.prototype.listen = function OptionsListen() {
  this.integrations.map((item) => {
    item.el.addEventListener('change', () => {
      const settings = {}
      settings[item.key] = item.el[item.prop]

      browser.storage.sync.set(settings)

      // run the callback if any
      if ('cb' in item) {
        this.callbacks[item.cb](item.el[item.prop])
      }
    })
  })

  this.buttons.map((item, index) => {
    item.el.addEventListener('click', (event) => {
      this.callbacks[item.cb](item.key.name, item.key.el.value)
    })
  })

  return this
}


const l10n = new Options()
l10n.init()
    .listen()
