import AbstractComponent from "../AbstractComponent.js";

const rootSelector = '[data-js-tabs]'

// Для основной логики конкретной группы табов
 class Tabs extends AbstractComponent {
  selectors = {
    root: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  }

  stateClasses = {
    isActive: 'is-active'
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  }

  constructor(rootElement) {
    super() // активируем функционал класса от которого расширились
    this.rootElement = rootElement
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button) // находим все кнопки переключения табов
    this.contentElements = document.querySelectorAll(this.selectors.content)

    //проксируемый объект (найдем индекс кнопки у которой есть класс is-active)
    this.state = this.getProxyState({
      activeTabIndex: [...this.buttonElements]
        .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive)),
    })

    // лимит индекса табов (чтобы корректно отработать управление табами с клавиатуры (клавишами влево и вправо))
    this.limitTabsIndex = this.buttonElements.length - 1

    this.bindEvents()
  }

  updateUI() {
    // деструктурируем свойство из объекта
    const { activeTabIndex } = this.state

    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === activeTabIndex

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
      buttonElement.classList.remove('button-light')
      if (!isActive) {
        buttonElement.classList.add('button-light')
      }
    })

    this.contentElements.forEach((contentElement, index) => {
      const isActive = index === activeTabIndex

      contentElement.classList.toggle(this.stateClasses.isActive, isActive)
    })
  }

  activateTab(newTabIndex) {
    this.state.activeTabIndex = newTabIndex
    this.buttonElements[newTabIndex].focus()
  }

  previousTab = () => {
    const newTabIndex = this.state.activeTabIndex === 0
      ? this.limitTabsIndex
      : this.state.activeTabIndex - 1

    this.activateTab(newTabIndex)
  }

  nextTab = () => {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
      ? 0
      : this.state.activeTabIndex + 1

    this.activateTab(newTabIndex)

  }

  firstTab = () => {
    this.activateTab(0)
  }

  lastTab = () => {
    this.activateTab(this.limitTabsIndex)
  }


  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex
  }

  // чтобы работали стрелки, влево вправо и горячие клавишы
  onKeyDown = (event) => {
    // деструктурируем 2 сущности
    const { code, metaKey } = event

    const action = {
      ArrowLeft: this.previousTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    }[code] // по имени свойства (по значению code) получаем ссылку на конкретный метод класса Tabs

    const isMacHomeKey = metaKey && code === 'ArrowLeft'
    if (isMacHomeKey) {
      this.firstTab()
      return
    }

    const isMacEndKey = metaKey && code === 'ArrowRight'
    if (isMacEndKey) {
      this.lastTab()
      return
    }

    action?.() // на случай если action не undefined (например он может стать undefined если нажмем например на букву ф)
  }

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onButtonClick(index))
    })

    this.rootElement.addEventListener('keydown', this.onKeyDown) // чтобы работала ссылка this.onKeyDown - нужно создать в виде стрелочной функции
  }
 }


// Для инициализации логики всех табов на одной странице (будет заниматься точечным запуском экземпляров основного класса Tabs)
class TabsCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Tabs(element)
    })
  }
}

export default TabsCollection
