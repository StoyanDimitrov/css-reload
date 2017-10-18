const PageAction = {
  el: document.getElementById('has-page-action'),
  prop: 'checked',
  key: 'hasPageAction',
}

const ContextMenu = {
  el: document.getElementById('has-context-menu'),
  prop: 'checked',
  key: 'hasContextMenu',
}

const HotKey = {
  el: document.getElementById('has-hot-key'),
  prop: 'checked',
  key: 'hasHotKey',
}

const UpdateImage = {
  el: document.getElementById('update-images'),
  prop: 'checked',
  key: 'updateImages',
}

function Options()
{
  this.options = [
    PageAction,
    ContextMenu,
    HotKey,
    UpdateImages
  ]
}

Options.prototype.init = function OptionsInit() {
  browser.storage.sync.get(defaultSettings)
    .then((branch) => {
      if (Object.keys(branch) === 0) {
        return this
      }

      this.options.map((item) => {
        item.el[item.prop] = branch[item.key]
      })
    })

  return this
}

Options.prototype.listen = function OptionsListen() {
  this.options.map((item) => {
    item.el.addEventListener('change', () => {
      const settings = {}
      settings[item.key] = item.el[item.prop]

      browser.storage.sync.set(settings)
    })
  })

  return this
}


const l10n = new Options()
l10n.init()
    .listen()
