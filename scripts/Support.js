class Support {

  selectors = {
    form: '[data-js-form]',
    fieldErrors: '[data-js-form-field-errors]',
  }

  // содержит типы ошибок и кастомные сообщения к ним
  errorMessages = {
    // имена свойств должны быть такими же кк и имена некоторых полей из свойства validity
    valueMissing: () => 'Please fill in this field',
    // если title заполнен, то вернет title, иначе вернет дефолтное сообщение
    patternMismatch: ({title}) => title || 'The data is not in the correct format.',
    tooShort: ({minLength}) => `Value too short, minimum characters - ${minLength}`,
    tooLong: ({maxLength}) => `Value too long, character limit - ${maxLength}`,
  }

  constructor() {
    this.bindEvents()
  }

  /**
   * для управления визуальным выводом ошибок
   * этот метод должен знать о DOM-элементе поля у которого обрабатываются ошибки
   * и знать о самих ошибках (о сообщениях с ошибками)
   * @param {Array} errorMessages - массив с ошибками,
   * на каждой итерации цикла нужно превратить обычную строку с сообщением об ошибке в html разметку
   */
  manageErrors(fieldControlElement, errorMessages) {
    const fieldErrorsElement = fieldControlElement.parentElement.querySelector(this.selectors.fieldErrors)

    if (errorMessages.length > 0) {
      fieldControlElement.classList.add('support__control--error')
    } else {
      fieldControlElement.classList.remove('support__control--error')
    }

    fieldErrorsElement.innerHTML = errorMessages
      .map((message) => `<span class="field__error">${message}</span>`)
      .join('')
  }

  validateField(fieldControlElement) {
    // validity - нужно ждя функционала валидации
    const errors = fieldControlElement.validity
    const errorMessages = []

    // преобразуем объект в массив пар ключ-значение и затем будет итерироваться по нему
    // деструктурируем нужные нам сущности
    Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
      // так как имена свойств объекта errorMessages совпадают с именами которые есть в errors (там ссылка на validity) то можно просто проверить
      if(errors[errorType]) {
        errorMessages.push(getErrorMessage(fieldControlElement))
      }
    })
    this.manageErrors(fieldControlElement, errorMessages)

    // поле считается валидным, если сообщений об ошибке 0
    const isValid = errorMessages.length === 0

    // для пользователей скринридеров (появляется aria-invalid с булевым значением)
    fieldControlElement.ariaInvalid = !isValid

    return isValid // для onSubmit
  }


  // проверяем что событие возникло внутри формы
  onBlur(event) {
    const { target } = event
    const isFormField = target.closest(this.selectors.form)
    const isRequired = target.required
    if (isFormField && isRequired) {
      this.validateField(target)
    }
  }

  onSubmit(event) {
    const isFormElement = event.target.matches(this.selectors.form)
    if (!isFormElement) return

     /**
      * превращаем html collection в array
      * @param {Array} event.target.elements - массив DOM-элементов полей ввода обязательных для заполнения
      *
      */
    const requiredControlElements = [...event.target.elements]
    // без деструктуризации .filter((element) => element.required)
      .filter(({required}) => required)

      let isFormValid = true
      let firstInvalidFieldControl = null

      requiredControlElements.forEach((element) => {
        const isFieldValid = this.validateField(element)

        if(!isFieldValid) {
          isFormValid = false

          if (!firstInvalidFieldControl) {
            firstInvalidFieldControl = element
          }
        }
      })

      if(!isFormValid) {
        event.preventDefault()
        firstInvalidFieldControl.focus()
      }
  }

  bindEvents() {
    // blur не сработает, так как оно не всплывает, отловим событие на эпапе погружения ({capture: true})
    // вместо {capture: true} можно написать просто true, но оставлю для наглядности
    document.addEventListener('blur', (event) => {
      this.onBlur(event)
    }, {capture: true})

    document.addEventListener('submit', (event) => this.onSubmit(event))
  }
}

export default Support
