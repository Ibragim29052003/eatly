const rootSelector = '[data-js-purchases]'

class Purchases {
  selectors = {
    root: rootSelector,
    toggle: '[data-js-purchases-toggle]',
    icon: '[data-js-purchases-icon]',
    content: '[data-js-purchases-content]',
  }

  stateClasses = {
    isActive: 'is-active'
  }

  stateAttributes = {
    ariaExpanded: 'aria-expanded'
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    if (!this.rootElement) {return}
    this.toggleElement = this.rootElement.querySelector(this.selectors.toggle)
    this.iconElement = this.rootElement.querySelector(this.selectors.icon)
    this.contentElement = this.rootElement.querySelector(this.selectors.content)
    this.bindEvents()
  }

  onToggleClick = () => {
    const isExpanded = this.toggleElement.getAttribute(this.stateAttributes.ariaExpanded) === 'true'

    this.toggleElement.setAttribute(this.stateAttributes.ariaExpanded, String(!isExpanded))
    this.iconElement.classList.toggle(this.stateClasses.isActive)
    this.contentElement.classList.toggle(this.stateClasses.isActive)
  }

  bindEvents() {
    this.toggleElement.addEventListener('click', this.onToggleClick)
  }

}

class PurchasesCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Purchases(element)
    })
  }
}

export default PurchasesCollection