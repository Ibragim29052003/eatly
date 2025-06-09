
class ChartActivityRange {
  selectors = {
    root: '[data-js-range]',
    input: '[data-js-range-input]',
    item: '[data-js-range-item]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    if (!this.rootElement) return

    this.inputElements = this.rootElement.querySelectorAll(this.selectors.input)
    this.itemElements = this.rootElement.querySelectorAll(this.selectors.item)

    this.bindEvents()
  }

  onInputChange = (event) => {
    const selectedInput = event.target // получаем выбранный input

    this.itemElements.forEach((item) => {
      item.classList.remove(this.stateClasses.isActive)
    })

      // находим родительский item для выбранного input
    const parentLabel = selectedInput.closest(this.selectors.item)
    if (parentLabel) {
      parentLabel.classList.add(this.stateClasses.isActive)
    }
  }

  bindEvents() {
    // для каждого input добавляем обработчик изменения
    this.inputElements.forEach((input) => {
      input.addEventListener('change', this.onInputChange)
    })
  }
}

export default ChartActivityRange
