// чтобы не дублировать код, создадим абстрактный класс
// мы можем от него расширяться, но не можем создавать экземпляр этого класса
class BaseComponent {

    constructor() {
        if(this.constructor === BaseComponent) {
            throw new Error('Невозможно создать экзепляр абстрактного класса BaseComponent!')
        }
    }

    // при каждом внесении изменений в объект состояния мы вызываем метод updateUI
  getProxyState(initialState) {
    return new Proxy(initialState, {
      get: (target, prop) => { // проксируемый объект и имя свойства
        return target[prop]
      },
      set: (target, prop, newValue) => {
        const oldValue = target[prop]

        target[prop] = newValue

        if (newValue !== oldValue) {
            this.updateUI()
        }

        return true
      },
    })
  }

  // перерисовка UI в ответ на обновление состояния
  updateUI() {
    throw new Error('Необходимо реализовать метод updateUI!')
  }
}

export default BaseComponent