import MatchMedia from "./MatchMedia.js"

class Say {

  selectors = {
    root: '[data-js-say-desktop-wrapper]',
    scroll: '[data-js-say-desktop-scroll]',
    progress: '[data-js-say-progress]',
    fixedCard: '[data-js-say-fixed-card]',
    mobileContainer: '[data-js-say-mobile-container]',
  }

  constructor() {
    this.desktopWrapper = document.querySelector(this.selectors.root)
    if (!this.desktopWrapper) {return}
    this.scrollContainer = this.desktopWrapper.querySelector(this.selectors.scroll)
    this.progressBar = this.desktopWrapper.querySelector(this.selectors.progress)
    this.fixedCard = document.querySelector(this.selectors.fixedCard)
    this.mobileContainer = document.querySelector(this.selectors.mobileContainer)

    this.init()
    this.bindEvents()
  }

  init() {
    this.toggleCardsVisibility() // показывает/скрывает карточки в зависимости от ширины экрана
    this.checkCardOverflow() // проверяет, выходит ли содержимое карточек за пределы
  }

  bindEvents() {
    // при изменении размера окна пересчитываем отображение карточек и прокрутку
    window.addEventListener('resize', () => {
      this.toggleCardsVisibility()
      this.checkCardOverflow()
    })

    // привязка прокрутки десктопного контейнера к обновлению прогресс-бара
    if (this.scrollContainer && this.progressBar) {
      this.scrollContainer.addEventListener('scroll', this.updateProgressBar.bind(this))
    }

    // привязка прокрутки десктопного контейнера к обновлению прогресс-бара
    if (this.mobileContainer) {
      this.mobileContainer.addEventListener('scroll', this.updateMobileProgressBar.bind(this))
    }
  }

  // метод переключения видимости блоков карточек в зависимости от ширины экрана
  toggleCardsVisibility() {
    // matches будет true, если будет выполняться условие в файле MatchMedia.js
    const isMobile = MatchMedia.mobile.matches
    if (isMobile) {
      if (this.desktopWrapper) this.desktopWrapper.style.display = 'none'
      if (this.mobileContainer) this.mobileContainer.style.display = 'flex'
      if (this.fixedCard) this.fixedCard.style.display = 'none'
    } else {
      if (this.desktopWrapper) this.desktopWrapper.style.display = 'flex'
      if (this.mobileContainer) this.mobileContainer.style.display = 'none'
      if (this.fixedCard) this.fixedCard.style.display = 'block'
    }
  }

  // метод проверки - переполняется ли содержимое карточки и установка класса при необходимости
   checkCardOverflow() {
    const cards = document.querySelectorAll('.say__card')

    cards.forEach(card => {
      const hasOverflow = card.scrollHeight > card.clientHeight
      card.classList.toggle('say__card--no-scroll', !hasOverflow)
    })
   }

   // обновление прогресс-бара при скроллинге на десктопе
   updateProgressBar() {
    const maxScroll = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth
    // this.scrollContainer.scrollLeft — сколько пикселей пользователь уже проскроллил влево по горизонтали.
    const scrollPercent = (this.scrollContainer.scrollLeft/maxScroll) * 100
    this.progressBar.style.width = scrollPercent + '%'
   }

   // обновление/создание прогресс-бара при скроллинге на мобильных устройствах
   updateMobileProgressBar() {
    // проверяем, есть ли уже прогресс-бар
    const progressBars = document.querySelectorAll('.say__mobile-progress')

    // если его нет, то создаем
    if (progressBars.length === 0) {
      const mobileProgressBar = document.createElement('div')
      mobileProgressBar.className = 'say__progress say__mobile-progress'

      const progressContainer = document.createElement('div')
      progressContainer.className = 'say__scrollbar'
      progressContainer.appendChild(mobileProgressBar)

      // вставляем прогресс-бар сразу после контейнера с карточками
      this.mobileContainer.parentNode.insertBefore(progressContainer, this.mobileContainer.nextSibling)
    }

    // обновляем ширину прогресс-бара при прокрутке
    const activeProgressBar = document.querySelector('.say__mobile-progress')
    if (activeProgressBar) {
      const maxScroll = this.mobileContainer.scrollWidth - this.mobileContainer.clientWidth
      const scrollPercent = (this.mobileContainer.scrollLeft / maxScroll) * 100
      activeProgressBar.style.width = scrollPercent + '%'
    }
  }
}


export default Say