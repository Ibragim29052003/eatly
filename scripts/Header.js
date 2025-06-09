class Header {
  selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
    loginBtn: '[data-js-login-btn]',
    signUpBtn: '[data-js-sign-up-btn]',
  }
  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    if (!this.rootElement) return

    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)

    this.loginBtn = document.querySelector(this.selectors.loginBtn)
    this.signUpBtn = document.querySelector(this.selectors.signUpBtn)

    this.bindEvents()
  }

  onBurgerButtonClick = () => {
    // добавление класса, если такого класса у элемента нет или удаляет класс, если класс у элемента есть
    this.overlayElement.classList.toggle(this.stateClasses.isActive)
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)

    // чтобы при открытии меню бургер кнопки замирала вся страница, которая неактивна (globals.scss)
    document.documentElement.classList.toggle(this.stateClasses.isLock)
  }

  onLoginClick = () => {
    sessionStorage.setItem('authForm', 'login')
  }

  onSignUpClick = () => {
    sessionStorage.setItem('authForm', 'signup')
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)

    this.loginBtn?.addEventListener('click', this.onLoginClick)
    this.signUpBtn?.addEventListener('click', this.onSignUpClick)
  }
}

export default Header