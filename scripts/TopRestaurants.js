 class TopRestaurants {
  selectors = {
    container: '[data-js-top-restaurants]',
    star: '[data-js-top-restaurants-star]',
    favorite: '[data-js-top-restaurants-favorite]',
    card: '[data-js-top-restaurants-card]',
    heart: '[data-js-top-restaurants-heart]',
  }
  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.rootElements = document.querySelectorAll(this.selectors.card)
    this.init()
  }

  _onIconClick(element) {
    element.classList.toggle(this.stateClasses.isActive)
  }

  _handleKeyDown(event, element) {
    if (event.key === 'Enter') {
      event.preventDefault() // Предотвращаем возможные побочные эффекты
      this._onIconClick(element)
    }
  }

  // переход на страницу товара, если клик не по звезде и не по избранному
  _handleCardClick(event, cardElement) {
    // closest - ищет ближайшего родителя (был ли клик по звезде или ее потомку)
    const starElement = event.target.closest(this.selectors.star)
    const favoriteElement = event.target.closest(this.selectors.favorite)
    if(!starElement && !favoriteElement) {
      const productUrl = cardElement.dataset.productUrl

      if (productUrl) {
        window.location.href = productUrl
      }
    }
  }

  init() {
    this.rootElements.forEach((rootEl) => {
      const bodyElement = rootEl.querySelector(this.selectors.container)
      const starElement = rootEl.querySelector(this.selectors.star)
      const favoriteElement = rootEl.querySelector(this.selectors.favorite)

      // на случай если ничего в блоке карточки не будет
      if(!bodyElement || !starElement || !favoriteElement) return

      // stopPropagation() - предотвращаем всплытие кликов по иконкам
      starElement.addEventListener('click', (event) => {
        event.stopPropagation()
        this._onIconClick(starElement)
      })
      favoriteElement.addEventListener('click', (event) => {
        event.stopPropagation()
        this._onIconClick(favoriteElement)
      })

      // обработчик для всей карточки
      rootEl.addEventListener('click', (event) => {
         const { target } = event
        const startClicked = target.closest(this.selectors.star)
        const favoriteClicked = target.closest(this.selectors.favorite)

        if (!startClicked && !favoriteClicked) {
          const productUrl = rootEl.dataset.productUrl
          if (productUrl) {
            window.location.href = productUrl
          }
        }

      })

       // Обработчик нажатия клавиши (Enter)
       starElement.addEventListener('keydown', (e) => this._handleKeyDown(e, starElement))
       favoriteElement.addEventListener('keydown', (e) => this._handleKeyDown(e, favoriteElement))
    })

    this._initHearts()
  }

// так как при создании функционала для кликабельной карточки, сломался функционал с сердечками
  _initHearts() {
    document.querySelectorAll(this.selectors.heart).forEach(heart => {
      heart.addEventListener('click', (e) => {
        e.stopPropagation()
        this._onIconClick(heart)
      })
    })
  }
}

export default TopRestaurants

