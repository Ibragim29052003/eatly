import Support from "./Support.js";

class AuthSystem extends Support {
  constructor() {
    super() // вызываем конструктор родительского класса

    this.selectors = {
      ...this.selectors, // берем селекторы из родительского класса
      toRegister: '[data-js-to-register]',
      toLogin: '[data-js-to-login]',
      toForgetPassword: '[data-js-to-forget-password]',
      signUpForm: '[data-js-form-sign-up]',
      signInForm: '[data-js-form-sign-in]',
      forgetPasswordForm: '[data-js-form-forget-password]',
      loginBtn: '[data-js-login-btn]',
      signUpBtn: '[data-js-sign-up-btn]',
      controlPassword: '[data-js-password-control]',
      toggleIconPassword: '[data-js-toggle-password]',
    }

    this.stateClasses = {
      isActive: 'is-active',
    }

    this.elements = {}
    Object.entries(this.selectors).forEach(([key, selector]) => {
      this.elements[key] = document.querySelector(selector)
    })

    this.init()
  }

  init() {
    this.handleFormFromSession();
    this.initPasswordToggle()
    this.bindEvents()
  }

  handleFormFromSession() {
    const savedForm = sessionStorage.getItem('authForm')

    const formMap = {
      signup: 'signUpForm',
      forget: 'forgetPasswordForm',
      default: 'signInForm',
    }

    this.showForm(formMap[savedForm] || formMap.default)

    // очищаем, чтобы не сохранялось при следующей загрузке
    sessionStorage.removeItem('authForm');
  }

  showForm(formKey) {
    const forms = ['signUpForm', 'forgetPasswordForm', 'signInForm']

    forms.forEach((key) => {
      this.elements[key]?.classList.toggle(
        this.stateClasses.isActive,
        key === formKey
      )
    })
  }

  setPasswordVisibility(visible) {
    const { controlPassword, toggleIconPassword } = this.elements
    if(!controlPassword || !toggleIconPassword) return

    controlPassword.type = visible ? 'text' : 'password'
    toggleIconPassword.classList.toggle(this.stateClasses.isActive, visible)
  }

  initPasswordToggle() {
    const icons = document.querySelectorAll(this.selectors.toggleIconPassword)
    if (!icons.length) return

    const showEvents = ['mousedown', 'touchstart']
    const hideEvents = ['mouseup', 'mouseleave', 'touchend']

  icons.forEach((icon) => {
    const parent = icon.closest('.sign-in__field-password, .sign-up__field-password')
    const control = parent?.querySelector(this.selectors.controlPassword)
    if(!control) return

    showEvents.forEach((event) => {
      icon.addEventListener(event, () => {
        control.type = 'text'
        icon.classList.add(this.stateClasses.isActive)
      })
    })

    hideEvents.forEach((event) => {
      icon.addEventListener(event, () => {
        control.type = 'password'
        icon.classList.remove(this.stateClasses.isActive)
      })
    })
  })
  }

  bindEvents() {

    const { toRegister, toLogin, toForgetPassword } = this.elements || {}
    if(!toRegister || !toLogin || !toForgetPassword) return

    // ccылки внутри форм
    toRegister.addEventListener('click', (event) => {
      event.preventDefault()
      this.showForm('signUpForm')
    })
    toLogin.addEventListener('click', (event) => {
      event.preventDefault()
      this.showForm('signInForm')
    })
    toForgetPassword.addEventListener('click', (event) => {
      event.preventDefault()
      this.showForm('forgetPasswordForm')
    })

    // вызываем родительский метод для привязки событий валидации
    super.bindEvents()
  }

}

export default AuthSystem
