import AbstractSwitchable from '../AbstractSwitchable.js'

const rootSelector = '[data-js-filter]'
const cardSelector = '[data-js-filter-card]'

class Filter extends AbstractSwitchable {
  selectors = {
    root: rootSelector,
    card: cardSelector,
  }

  stateClasses = {
    isActive: 'is-active',
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  }

  constructor(rootElement) {
    const cardElements = rootElement.querySelectorAll(cardSelector)
    const initialIndex = [...cardElements].findIndex(el =>
      // в классах, которые наследуются (extends), нельзя обращаться к this до вызова super() в constructor.
      el.classList.contains('is-active')
    )

    // Передаём parentElement как null, если не нужен
    super(cardElements, initialIndex, null)

    this.rootElement = rootElement
    this.bindEvents()
  }

  updateElementState(element, isActive) {
    element.classList.toggle(this.stateClasses.isActive, isActive)
    element.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')

    if (this.stateAttributes.ariaSelected) {
      element.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
    }
  }

  bindEvents() {
    this.elements.forEach((element, index) => {
      element.addEventListener('click', (e) => {
        e.preventDefault() // Добавляем на случай, если это ссылка
        this.activate(index)
      })
    })

    if (typeof this.bindKeyboardNavigation === 'function') {
      this.bindKeyboardNavigation()
    }
  }
}

class FilterCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Filter(element)
    })
  }
}

export default FilterCollection