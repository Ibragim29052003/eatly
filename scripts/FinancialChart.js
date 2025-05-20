import AbstractSwitchable from './AbstractSwitchable.js'

/**
 * КОМПОНЕНТ ТАБОВ ПЕРИОДОВ
 * Управляет табами (Main/Weekly/Monthly/Yearly)
 */
class PeriodTabs extends AbstractSwitchable {
  /**
   * Обновляет состояние отдельного таба
   */
  updateElementState(element, isActive) {
    element.classList.toggle(this.stateClasses.isActive, isActive)
    element.setAttribute(this.stateAttributes.ariaSelected, isActive)
    element.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
  }

  /**
   * Привязывает обработчики событий
   */
  bindEvents() {
    this.elements.forEach((element, index) => {
      // Клик мышью
      element.addEventListener('click', () => this.activate(index))

      // Обработка фокуса (для синхронизации activeIndex)
      element.addEventListener('focus', () => {
        const focusedIndex = [...this.elements].indexOf(element)
        if (focusedIndex !== -1 && focusedIndex !== this.state.activeIndex) {
          this.activate(focusedIndex)
        }
      })
    })

    // Навигация с клавиатуры
    this.bindKeyboardNavigation()
  }
}

/**
 * КОМПОНЕНТ RANGE-ЭЛЕМЕНТОВ
 * Управляет элементами детализации (2D/4D/5D/6D/7D)
 */
class DetailRange extends AbstractSwitchable {
  /**
   * Обновляет состояние элемента
   */
  updateElementState(element, isActive) {
    element.classList.toggle(this.stateClasses.isActive, isActive)
    element.setAttribute(this.stateAttributes.ariaChecked, isActive)

    const span = element.querySelector('span')
    if (span) {
      span.setAttribute(this.stateAttributes.ariaHidden, !isActive)
    }
  }

  /**
   * Привязывает обработчики событий
   */
  bindEvents() {
    this.elements.forEach((element, index) => {
      // Клик мышью
      element.addEventListener('click', () => this.activate(index))

      // Обработка фокуса
      element.addEventListener('focus', () => {
        const focusedIndex = [...this.elements].indexOf(element)
        if (focusedIndex !== -1 && focusedIndex !== this.state.activeIndex) {
          this.activate(focusedIndex)
        }
      })
    })

    // Навигация с клавиатуры
    this.bindKeyboardNavigation()
  }
}

/**
 * ГЛАВНЫЙ КОМПОНЕНТ ГРАФИКА
 * Координирует взаимодействие между:
 * - Табами периодов
 * - Range-элементами
 * - Графиком данных
 */
export default class FinancialChart {
  constructor() {
    this.container = document.querySelector('.hero__chart-activity')
    if (!this.container) {
      console.warn('FinancialChart: Container not found')
      return
    }

    this.initComponents()
    this.setupInteractions()
  }

  /**
   * Инициализирует дочерние компоненты
   */
  initComponents() {
    // Табы периодов
    this.periodTabs = new PeriodTabs(
      this.container.querySelectorAll('[data-js-tabs-button]'),
      [...this.container.querySelectorAll('[data-js-tabs-button]')]
        .findIndex(el => el.classList.contains('is-active'))
    )

    // Range-элементы
    this.detailRange = new DetailRange(
      this.container.querySelectorAll('[data-js-range-item]'),
      [...this.container.querySelectorAll('[data-js-range-item]')]
        .findIndex(el => el.classList.contains('is-active'))
    )

    this.periodTabs.bindEvents()
    this.detailRange.bindEvents()
  }

  /**
   * Настраивает взаимодействие между компонентами
   */
  setupInteractions() {
    // При смене периода сбрасываем детализацию
    this.periodTabs.on('change', () => {
      this.detailRange.activate(0)
      this.loadData()
    })

    // При смене детализации обновляем данные
    this.detailRange.on('change', this.loadData.bind(this))
  }

  /**
   * Загрузка данных для графика
   */
  loadData() {
    const period = this.periodTabs.getActiveValue()
    const detail = this.detailRange.getActiveValue()

    console.log(`Загрузка данных: Период=${period}, Детализация=${detail}`)
    // Реальная реализация:
    // Что - то там... ОКАК😂
  }
}