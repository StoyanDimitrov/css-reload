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

function Options()
{
  this.$ = [
    PageAction,
    ContextMenu,
    HotKey,
  ]
}

Options.prototype.init = function()
{
  browser.storage.sync.get().then((branch) => {

    if (Object.keys(branch) === 0) {
      return this
    }

console.log('storage', branch)
      this.$.map((item) => {
        item.el[item.prop] = branch[item.key]
      })
  }).catch((err) => {
    console.log(err)
  })

  return this
}

Options.prototype.listen = function()
{
  this.$.map((item) => {
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