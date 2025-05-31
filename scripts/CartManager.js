/* класс для управления коризной извне

отвечает за:
1) добавление товаров в корзину
2) обновление счетчика в шапке

*/
class CartManager {
  selectors = {
    buttons: '[data-js-card-add-to-basket]',
    cartCount: '[data-js-link-badge]',
    cartCountMobile: '[data-js-link-badge-mobile]',
    product: '[data-js-parent-cart]',  // карточка в которой есть иконка плюса
  }

  constructor() {
    // загружаем сохраненную корзину из localStorage
    // если корзины нет - создаем пустой объект
    this.cart = JSON.parse(localStorage.getItem('cart')) || {}

    this.buttons = document.querySelectorAll(this.selectors.buttons) // находим все кнопки добавления в корзину
    this.productEl = document.querySelectorAll(this.selectors.product)

    this.cartCountEl = document.querySelector(this.selectors.cartCount)
    this.cartCountMobileEl = document.querySelector(this.selectors.cartCountMobile)
    if (this.cartCountEl || this.cartCountMobileEl) {
      // инициализируем корзину
      this.updateCartCount()
      this.setupAddButtons()
    } else {
      console.warn('Элемент header__nav-link-badge не найден в DOM')
    }

  }


  setupAddButtons() {

    this.buttons.forEach(btn => {
      btn.addEventListener('click', event => {
        // найдем карточку товара, к которой принадлежит кнопка добавления в корзину
        const parentCart = event.target.closest(this.selectors.product)

        // извлекаем данные о товаре из data-атрибутов карточки
        const name = parentCart.dataset.name
        const price = parseFloat(parentCart.dataset.price) // преобразуем в число с плавающей точкой (так как в фигме так)
        const img = parentCart.dataset.img

        // добавляем товар в корзину
        this.addItem(name, price, img)
      })
    })
  }


  // добавляем товар в корзину или увеличиваем количество, если товар уже есть
  /**
    @param {string} name - название товара
    @param {number} price - цена товара
    @param {string} img - ссылка на изображение товара
   */
  addItem(name, price, img) {
    // если товар в корзине есть - увеличиваем количество
    if(this.cart[name]) {
      this.cart[name].quantity++
    } else { // если товара нет - добавляем новый элемент
      this.cart[name] = {
        price: price,
        quantity: 1,
        img: img
      }
    }
    // сохраняем в localStorage
    this.saveCart()

    this.updateCartCount()
  }

  // обновляем счетчик товаров в иконке корзины
  updateCartCount() {
    // считаем общее количество товаров в корзине
    // Object.values - преобразует объект в массив значений
    // reduce - проходит по всем элементам и суммирует их колличество
    const totalCount = Object.values(this.cart).reduce(
      (acc, item) => acc + item.quantity, 0
    )

    // если есть товоры - показываем счетчик
    if (this.cartCountEl) {
      if (totalCount > 0) {
        this.cartCountEl.style.display = 'inline-block'
        this.cartCountEl.textContent = totalCount
      } else {
        // если корзина пуста скрываем счетчик
        this.cartCountEl.style.display = 'none'
      }
    }

    if (this.cartCountMobileEl) {
      if (totalCount > 0) {
        this.cartCountMobileEl.style.display = 'inline-block'
        this.cartCountMobileEl.textContent = totalCount
      } else {
        // если корзина пуста скрываем счетчик
        this.cartCountMobileEl.style.display = 'none'
      }
    }
  }

  // сохраняем текущее состояние корзины в localStorage
  saveCart() {
    // преобразуем объект корзины в JSON-строку и сохраняем
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

}

export default CartManager