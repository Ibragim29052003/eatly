/**
 * БАЗОВЫЙ КЛАСС КОМПОНЕНТА
 * Основные функции:
 * - управление состоянием через Proxy
 * - система событий
 * - общие константы для классов и атрибутов
 */
export default class BaseComponent {
  stateClasses = {
    isActive: 'is-active'
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
    ariaChecked: 'aria-checked',
    ariaHidden: 'aria-hidden'
  }

  /**
   * Создает реактивное состояние с автоматическим обновлением UI
   */
  getProxyState(state) {
    return new Proxy(state, {
      set: (target, property, value) => {
        target[property] = value
        this.updateUI()
        return true
      }
    })
  }

  /**
   * Подписка на события компонента
   */
  on(eventName, callback) {
    this.events = this.events || {}
    this.events[eventName] = callback
  }

  /**
   * Генерация события
   */
  trigger(eventName, ...args) {
    this.events?.[eventName]?.(...args)
  }
}