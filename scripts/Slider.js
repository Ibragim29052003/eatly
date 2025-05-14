import BaseComponent from "./BaseComponent.js"

const rootSelector = '[data-js-slider]'

class Slider extends BaseComponent {

  selectors = {
    root: rootSelector,
    button: '[data-js-dots-button]',
    content: '[data-js-dots-content]',
  }

  stateClasses = {
    isActive: 'is-active'
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  }

  constructor(rootElement) {
    super() // активируем функционал класса от которого расширялись
    this.rootElement = rootElement
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button) // находим все точки, для переключения слайдера
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)

    // проксируемый объект (найдем индекс точки, у которой есть класс is-active)
    this.state = this.getProxyState({
      activeDotIndex: [...this.buttonElements]
      .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive)),
    })

    // лимит индексов у точек (чтобы корректно отработать управление точками с клавиатуры (стрелки вниз вверх))
    this.limitDotsIndex = this.buttonElements.length - 1
    this.bindEvents()
  }

  updateUI() {
    // деструктурируем свойство из объекта
    const { activeDotIndex } = this.state

    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === activeDotIndex

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
    })

    this.contentElements.forEach((contentElement, index) => {
      const isActive = index === activeDotIndex
      contentElement.classList.toggle(this.stateClasses.isActive, isActive)
    })

    // Блокировка скролла при не первом слайде
    document.body.classList.toggle('slider-open', activeDotIndex !== 0)
  }

  activeDot(newDotIndex) {
    this.state.activeDotIndex = newDotIndex
    this.buttonElements[newDotIndex].focus()
  }

  previousDot = () => {
    const newDotIndex = this.state.activeDotIndex === 0
      ? this .limitDotsIndex
      : this.state.activeDotIndex - 1

    this.activeDotIndex(newDotIndex)
  }

  nextDot = () => {
    const newDotIndex = this.state.activeDotIndex === this.limitDotsIndex
      ? 0
      :this.state.activeDotIndex + 1

    this.activeDotIndex(newDotIndex)
  }

  firstDot = () => {
    this.activeDot(0)
  }

  lastDot = () => {
    this.activeDot(this.limitDotsIndex)
  }

  onButtonClick(buttonIndex) {
    this.state.activeDotIndex = buttonIndex
  }

  // чтобы работали стрелки вниз, вверх и горячие клавиши
  onKeyDown = (event) => {
    // дестркутурируем две сущности
    const { code, metaKey } = event

    const action = {
      ArrowUp: this.previousDot,
      ArrowDown: this.nextDot,
      Home: this.firstDot,
      End: this.lastDot,
      }[code] // по имени свойства (по значению code) получаем ссылку на конкретный метод класса Tabs

      const isMacHomeKey = metaKey && code === 'ArrowUp'
      if (isMacHomeKey) {
        this.firstDot()
        return
      }

      const isMacEndKey = metaKey && code === 'ArrowDown'
      if (isMacEndKey) {
        this.lastDot()
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
class SliderCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Slider(element)
    })
  }
}

export default SliderCollection













