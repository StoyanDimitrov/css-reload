function L10n()
{}

L10n.prototype.init = function()
{
  const texts = this.get('[data-l10n-text]')
    , titles = this.get('[data-l10n-title]')

  texts.map((node) => {
    node.textContent = browser.i18n.getMessage(node.getAttribute('data-l10n-text'))
  })

  titles.map((node) => {
    titles.setAttribute('title', browser.i18n.getMessage(node.getAttribute('data-l10n-title')))
  })
}

L10n.prototype.get = function(selector)
{
  return Array.from(document.documentElement.querySelectorAll(selector))
}



document.addEventListener('readystatechange', () => {
  if (document.readyState !== 'interactive') {
    return
  }

  (new L10n()).init()
})
