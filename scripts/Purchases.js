class Purchases {
  selectors = {
    root: '[data-js-purchases]',
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

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
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

export default Purchases




