import BaseComponent from './BaseComponent.js'

/**
 * АБСТРАКТНЫЙ КЛАСС ПЕРЕКЛЮЧАТЕЛЯ
 * Реализует общую логику для:
 * - Табов (PeriodTabs)
 * - Range-элементов (DetailRange)
 *
 * Основные функции:
 * - Управление активным элементом
 * - Навигация с клавиатуры
 * - Автоматическое обновление состояния
 */
export default class AbstractSwitchable extends BaseComponent {
  constructor(elements, activeIndex = 0) {
    super()
    this.elements = elements
    this.limitIndex = elements.length - 1

    this.state = this.getProxyState({
      activeIndex: activeIndex !== -1 ? activeIndex : 0
    })
  }

  /**
   * Находит изначально активный элемент
   */
  findInitialActiveIndex() {
    return [...this.elements].findIndex(el =>
      el.classList.contains(this.stateClasses.isActive))
  }

  /**
   * Обновляет UI всех элементов
   */
  updateUI() {
    this.elements.forEach((element, index) => {
      const isActive = index === this.state.activeIndex
      this.updateElementState(element, isActive)
    })
  }

  /**
   * Активирует элемент по индексу
   */
  activate(newIndex) {
    if (newIndex >= 0 && newIndex <= this.limitIndex) {
      this.state.activeIndex = newIndex
      this.trigger('change', this.getActiveValue())
      this.focusActiveElement()
    }
  }

  /**
   * Фокусирует активный элемент
   */
  focusActiveElement() {
    this.elements[this.state.activeIndex].focus()
  }

  /**
   * Возвращает значение активного элемента
   */
  getActiveValue() {
    return this.elements[this.state.activeIndex].textContent.trim()
  }

  /**
   * Навигация с клавиатуры
   */
  bindKeyboardNavigation() {
    this.elements.forEach(element => {
      element.addEventListener('keydown', (e) => {
         // Для Mac: добавляем обработку Meta (Cmd) + стрелки
        const isMacHome = e.metaKey && e.code === 'ArrowLeft'
        const isMacEnd = e.metaKey && e.code === 'ArrowRight'

        if (isMacHome) {
          e.preventDefault()
          this.first()
          return
        }
        if (isMacEnd) {
          e.preventDefault()
          this.last()
          return
        }
        // Обработка Enter
        if (e.code === 'Enter') {
          e.preventDefault()
          const index = [...this.elements].indexOf(e.target)
          if (index !== -1) this.activate(index)
          return
        }

        const actions = {
          ArrowLeft: () => this.previous(),
          ArrowRight: () => this.next(),
          Home: () => this.first(),
          End: () => this.last()
        }

        if (actions[e.code]) {
          e.preventDefault()
          actions[e.code]()
        }
      })
    })
  }

  // Методы навигации
  previous = () => this.activate(
    this.state.activeIndex === 0 ? this.limitIndex : this.state.activeIndex - 1
  )
  next = () => this.activate(
    this.state.activeIndex === this.limitIndex ? 0 : this.state.activeIndex + 1
  )
  first = () => this.activate(0)
  last = () => this.activate(this.limitIndex)
}