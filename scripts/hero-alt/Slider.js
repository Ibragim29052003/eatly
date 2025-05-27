class Slider {

  selectors = {
    root: '[data-js-hero-alt-slider]',
    slide: '[data-js-hero-alt-slide]',
    line: '[data-js-hero-alt-slider-line]',
  }

  stateClasses = {
    isActive: 'is-active',
    isNext: 'is-next',
    isPrev: 'is-prev',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    if (!this.rootElement) {return}
    this.slideElements = this.rootElement.querySelectorAll(this.selectors.slide)
    this.lineElements = this.rootElement.querySelectorAll(this.selectors.line)
    this.currentIndex = 0
    this.interval = null
    this.delay = 3000
    this.isDragging = false
    this.startX = 0
    this.currentX = 0
    this.dragThreshold = 50 // минимальное расстояние для смены слайда

    this.init()
  }

  init() {
    // автопрокрутка
    this.start()

    // клики по линиям навигации
    this.lineElements.forEach(line => {
      line.addEventListener('click', (event) => {
        this.goToSlide(parseInt(event.target.dataset.slide))
      })
    })

    this.rootElement.addEventListener('mousedown', this.handleMouseDown.bind(this))
    this.rootElement.addEventListener('mousemove', this.handleMouseMove.bind(this))
    this.rootElement.addEventListener('mouseup', this.handleMouseUp.bind(this))
    this.rootElement.addEventListener('mouseleave', this.handleMouseUp.bind(this))

    // мобилка
    this.rootElement.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true })
    // passive: false // обработчик МОЖЕТ вызвать event.preventDefault()
    this.rootElement.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false })
    this.rootElement.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true })

    // при наведении курсора - пауза

    this.rootElement.addEventListener('mouseenter', () => this.pause())
    this.rootElement.addEventListener('mouseleave', () => !this.isDragging && this.resume())
  }

  // управление слайдами
  showSlide(index) {
    // коррекция индекса при выходе ха границы
    if (index < 0) {
      index = this.slideElements.length - 1
    }
    if (index >= this.slideElements.length) {
      index = 0
    }

    // сброс классов у всех слайдеров
    this.slideElements.forEach((slide, i) => {
      slide.classList.remove(
        this.stateClasses.isActive,
        this.stateClasses.isNext,
        this.stateClasses.isPrev
      )

      // установка классов в зависимости от позиции
      if (i === index) {
        slide.classList.add(this.stateClasses.isActive)
      } else if (i < index) {
        slide.classList.add(this.stateClasses.isNext)
      } else {
        slide.classList.add(this.stateClasses.isPrev)
      }
    })

    // обновление активной линии
    this.lineElements.forEach((line) => {
      line.classList.remove(this.stateClasses.isActive)
    })
    // lineElements[index] - достаем номер текущего активного слайда 👀
    this.lineElements[index].classList.add(this.stateClasses.isActive)

    this.currentIndex = index
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1)
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1)
  }

  // переход к конкретному слайду
  goToSlide(index) {
    this.showSlide(index)
  }

  start() {
    this.interval = setInterval(() => {
      this.nextSlide()
    }, this.delay)
  }

  pause() {
    clearInterval(this.interval)
  }

  resume() {
    if(!this.interval) {
      this.start()
    }
  }

  // сброс таймера (при ручном взаимодействии)
  resetTimer() {
    this.pause()
    this.start()
  }

  // обработчики мыши
  handleMouseDown(e) {
    this.isDragging = true
    this.startX = e.clientX
    this.currentX = this.startX
    this.pause()
    this.rootElement.style.cursor = 'grabbing'
  }

  handleMouseMove(e) {
    if(!this.isDragging) {return}
    this.currentX = e.clientX
  }

  handleMouseUp() {
    if(!this.isDragging) {return}
    this.isDragging = false;
    this.rootElement.style.cursor = 'grab'

    // определение перетаскивания
    const diff = this.startX - this.currentX
    if (Math.abs(diff) > this.dragThreshold) {
      diff > 0 ? this.nextSlide() : this.prevSlide()
    }
    this.resetTimer()
  }

  // обработчики касаний
  handleTouchStart(e) {
    this.isDragging = true
    // e.touches - массив всех точек касания (для мультитача).
    // e.touches[0] - первое (основное) касание
    this.startX = e.touches[0].clientX
    this.currentX = this.startX
    this.pause()
  }

  handleTouchMove(e) {
    if (!this.isDragging) {return}
    this.currentX = e.touches[0].clientX

    // блокировка вертикального скролла при горизонтальном свайпе
    // (10 пикселей), чтобы отличить свайп от случайного дрожания пальца.
    if (Math.abs(this.startX - this.currentX) > 10) {
      e.preventDefault()
    }
  }

  handleTouchEnd() {
    if (!this.isDragging) {return}
    this.isDragging = false

    // определение направления свайпа
    const diff = this.startX - this.currentX
    if (Math.abs(diff) > this.dragThreshold) {
      diff > 0 ? this.nextSlide() : this.prevSlide()
    }
    this.resetTimer()
  }

}

export default Slider