class TopRestaurants {
  selectors = {
    root: '[data-js-top-restaurants]',
    star: '[data-js-top-restaurants-star]',
    favorite: '[data-js-top-restaurants-favorite]',
  }
  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.rootElements = document.querySelectorAll(this.selectors.root)
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

  init() {
    this.rootElements.forEach((rootEl) => {
      const starElement = rootEl.querySelector(this.selectors.star)
      const favoriteElement = rootEl.querySelector(this.selectors.favorite)

      // на случай если ничего в блоке карточки не будет
      if(!starElement || !favoriteElement) return

      starElement.addEventListener('click', () => this._onIconClick(starElement))
      favoriteElement.addEventListener('click', () => this._onIconClick(favoriteElement))

       // Обработчик нажатия клавиши (Enter)
       starElement.addEventListener('keydown', (e) => this._handleKeyDown(e, starElement))
       favoriteElement.addEventListener('keydown', (e) => this._handleKeyDown(e, favoriteElement))
    })
  }

}

export default TopRestaurants

