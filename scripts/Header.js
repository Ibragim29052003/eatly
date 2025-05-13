class Header {
  selectors = {
    root: '[data-js-header]',
    navigation: '[data-js-header-navigation]',
    burgerButton: '[data-js-header-burger-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.navigationElement = this.rootElement.querySelector(this.selectors.navigation)
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
    this.bindEvents()
  }

  onBurgerButtonClick = () => {
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
    this.navigationElement.classList.toggle(this.stateClasses.isActive)

    // чтобы при открытии бургер меню замирала вся страница, которая неактивна (globals.scss)
    document.documentElement.classList.toggle(this.stateClasses.isLock)

  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
  }
}

export default Header