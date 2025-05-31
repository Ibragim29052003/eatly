// класс для управления страницей корзины
/**
 * Отвечает за:
 * - отображения списка товаров в корзине
 * - изменение количества товаров
 * - расчет и отображение сумм
 * - оформление заказа
 */

class Cart {
  selectors = {
    cartItems: '[data-js-basket-card]', // контейнер для товаров
    subtotal: '[data-js-basket-subtotal]',
    delivery: '[data-js-basket-delivery]',
    total: '[data-js-basket-total]',
    emptyCardMsg: '[data-js-basket-empty-card]',
    confirmationMsg: '[data-js-basket-confirm-msg]',
    checkoutButton: '[data-js-basket-button-checkout]',
  }

  stateAttribute = {
    ariaDisabled: 'aria-disabled',
  }

  constructor() {
    // загружаем корзину из localStorage
    this.cart = JSON.parse(localStorage.getItem('cart')) || {}

    this.cartItemsContainer = document.querySelector(this.selectors.cartItems)
    this.subtotalEl = document.querySelector(this.selectors.subtotal)
    this.deliveryEl = document.querySelector(this.selectors.delivery)
    this.totalEl = document.querySelector(this.selectors.total)
    this.emptyCardMsg = document.querySelector(this.selectors.emptyCardMsg)
    this.confirmationMsg = document.querySelector(this.selectors.confirmationMsg)
    this.checkoutButtonEl = document.querySelector(this.selectors.checkoutButton)

    // стоимость доставки (пока что возьму с фигмы статичную)
    this.deliveryCost = 3.59

    this.renderCart() // отрисовываем товары
    this.setupEvents() // настройка обработчиков события
  }

  /**
   * форматируем количество товаров, добавляя ведущий ноль для значений < 10 (с фигмы)
   * @param {number} quantity - количество товара
   * @returns {string} - отформатированное количество (01, 02, ..., 09, 10, 11...)
   */
  formatQuantity(quantity) {
    return quantity.toString().padStart(2, '0')
  }

  // отрисовываем все товары в корзине
  renderCart() {
    this.cartItemsContainer.innerHTML = '' // очищаем контейнер

    // преобразуем объект корзины в массив [название, данные]
    const items = Object.entries(this.cart)

    if (items.length === 0) {
      this.emptyCardMsg.style.display = 'block'
      this.cartItemsContainer.style.display = 'none'
      this.updateTotals(0) // обновляем суммы с нулевыми значениями
      return
    }

    // для каждого товара в корзине создаем элемент
    items.forEach(([name, data]) => {
      const itemEl = document.createElement('div')
      itemEl.className = 'basket__card-item'
      itemEl.setAttribute('data-name', name)

      // расчитываем общую стоимость для этого товара
      const itemTotalPrice = (data.price * data.quantity).toFixed(2)

      // HTML-разметка для товара
      itemEl.innerHTML = `
        <div class="basket__card-item-info">
          <img src="${data.img}" alt="${name}" class="basket__card-item-image" />
          <div class="basket__card-item-details">
            <div class="basket__card-item-name">${name}</div>
            <div class="basket__card-item-price">$${data.price.toFixed(2)}</div>
          </div>
        </div>
        <div class="basket__card-qty-controls">
         <div class="basket__card-qty-controls-info">
          <button class="basket__card-qty-button basket__card-qty-button--remove"></button>
          <span class="basket__card-quantity">${this.formatQuantity(data.quantity)}</span>
          <button class="basket__card-qty-button basket__card-qty-button--add"></button>
           </div>
            <div class="basket__card-item-total">$${itemTotalPrice}</div>
        </div>
      `

      // добавляем товар в контейнер
      this.cartItemsContainer.appendChild(itemEl)
    })

    // обновляем итоговые суммы
    this.updateTotals()
  }

  /**
   * обновляем отображение всех сумм (подытог, доставка, итого)
   * @param {number|null} subtotal - если передано, используется это значение, иначе вычисляется
   *
   */
  updateTotals(subtotal = null) {
    // если сумма не передана, вычисляем ее как сумму всех товаров
    if (subtotal === null) {
      subtotal = Object.values(this.cart).reduce(
        (acc, { price, quantity }) => acc + price * quantity,
        0
      )
    }
    // обновляем подытог
    this.subtotalEl.textContent = subtotal.toFixed(2)

    // если есть товары в корзине
    if (subtotal > 0) {
      this.deliveryEl.textContent = this.deliveryCost.toFixed(2) // показываем стоимость доставки
      this.totalEl.textContent = (subtotal + this.deliveryCost).toFixed(2) // товары + доставка
    } else {
      this.deliveryEl.textContent = '0.00'
      this.totalEl.textContent = '0.00'
    }
  }

  // сохраняем текущее состояние корзины в localStorage
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }


  /**
   * настраиваем все обработчики событий:
   * - кнопки увеличения/уменьшения количества
   * - кнопка оформления заказа
   */

  setupEvents() {
    // клик по кнопкам изменения количества
    this.cartItemsContainer.addEventListener('click', event => {
      const { target } = event
      // игнорируем клик не по кнопкам
      if (!target.classList.contains('basket__card-qty-button')) {return}

      // найдем карточку товара по которой кликнули
      const itemEl = target.closest('.basket__card-item')
      const name = itemEl.getAttribute('data-name') // получаем название товара

      // обработка кнопки "+"
      if (target.classList.contains('basket__card-qty-button--add')) {
        this.cart[name].quantity++
        this.saveCart()
        this.renderCart() // перерисовываем корзину
      }

      // обработка кнопки "-"
      else if (target.classList.contains('basket__card-qty-button--remove')) {
        this.cart[name].quantity--

        // если количество достигло 0 - удаляем товар полностью
        if (this.cart[name].quantity <= 0) {
          delete this.cart[name]
        }
        this.saveCart()
        this.renderCart() // перерисовываем корзину
      }
    })


    // клик по кнопке оформление заказа
    this.checkoutButtonEl.addEventListener('click', () => {
      // если корзина пуста, ничего не делаем
       if (Object.keys(this.cart).length === 0) {return}

      // блокируем кнопку на время оформления
      this.checkoutButtonEl.disabled = true
      this.checkoutButtonEl.setAttribute(this.stateAttribute.ariaDisabled, 'true')
      this.checkoutButtonEl.textContent = 'The order is placed...'

      // имитируем оформление заказа (в реальном приложении здесь будет запрос к серверу 👀)
      setTimeout(() => {
        this.cart = {}
        this.saveCart()
        this.renderCart()
        this.checkoutButtonEl.disabled = false
        this.checkoutButtonEl.setAttribute(this.stateAttribute.ariaDisabled, 'false')
        this.checkoutButtonEl.textContent = 'Review Payment' // вернули исходный текст
        this.showConfirmation() // показываем сообщение об успешном оформлении
      }, 1500)
    })
  }

  /**
   * покажем слова благодарности за заказ на 2.5 секунды
   */
  showConfirmation() {
    this.confirmationMsg.style.display = 'block'
    setTimeout(() => {
      this.confirmationMsg.style.display = 'none'
    }, 2500)
  }
}

new Cart()