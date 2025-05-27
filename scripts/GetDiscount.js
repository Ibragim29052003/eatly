class GetDiscount {

  selectors = {
    field: '[data-js-get-discount-field]',
  }

  resizeTimer = null // таймер для debounce

  constructor() {
    this.fieldElement = document.querySelector(this.selectors.field)
    if (!this.fieldElement) {return}
    this.init()
    this.bindEvents()
  }

  init() {
    this.updatePlaceholder()
  }

  updatePlaceholder() {
    const isMobile = window.matchMedia('(max-width: 767.98px)').matches

    this.fieldElement.placeholder = isMobile ? 'Email Address' : 'Enter Your Email Address'
  }

  bindEvents() {
    // функция-обработчик с debounce (чтобы resize не срабатывал миллион раз)
    const handleResize = () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.updatePlaceholder()
      }, 100)
    }
    window.addEventListener('resize', handleResize)

    // функция для отписки
    this.unbindEvents = () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(this.resizeTimer)
    }
  }
  // когда компонент больше не нужен
  destroy() {
    if (this.unbindEvents) { // существует ли метод unbindEvents
      this.unbindEvents()
    }
  }

}

export default GetDiscount