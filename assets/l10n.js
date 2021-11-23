function L10n()
{}

L10n.prototype.init = function () {
  const texts = this.get('[data-l10n-text]')
  const titles = this.get('[data-l10n-title]')

  texts.forEach((node) => {
    node.textContent = browser.i18n.getMessage(node.dataset.l10nText)
  })

  titles.forEach((node) => {
    titles.setAttribute('title', browser.i18n.getMessage(node.dataset.l10nTitle))
  })
}

L10n.prototype.get = function (selector) {
  return document.documentElement.querySelectorAll(selector)
}



document.addEventListener('readystatechange', () => {
  if (document.readyState !== 'interactive') {
    return
  }

  (new L10n()).init()
})
