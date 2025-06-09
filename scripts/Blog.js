class Blog {
  selectors = {
    faq: '[data-js-faq]',
    discount: '[data-js-discount]',
    articlesView: '[data-js-articles-view]',
    articlesGrid: '[data-js-articles-grid]',
    prevBtn: '[data-js-prev-page-btn]',
    nextBtn: '[data-js-next-page-btn]',
    articleView: '[data-js-article-view]',
    articleImage: '[data-js-article-view-image]',
    articleTitle: '[data-js-article-view-title]',
    articleBody: '[data-js-article-view-body]',
    articleNextBtn: '[data-js-article-view-next-btn]',
    relatedList: '[data-js-related-list]',
  }

  stateAttribute = {
    disabled: 'disabled',
    hidden: 'hidden',
    ariaLabel: 'aria-label',
  }

  constructor() {

    this.state = {
      articles: this.generateArticles(), // массив статей
      currentPage: 0, // текущая страница пагинации
      perPage: 6, // количество статей на странице (как в фигме)
      currentArticleId: null, // id текущей открытой статьи
    }

    this.init()
  }


  /**
   * генерируем массив статей
   *  @returns {Array} массив объектов статей
   */
  generateArticles() {
    const articlesData =
    [
      {
        title: "How To Order Food ?",
        image: "../images/article/1.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-1">

            <div class="card-detail__section" aria-labelledby="section-title-1-1">
              <h2 class="card-detail__subtitle" id="section-title-1-1">Browse Restaurants And Menus</h2>
              <p class="card-detail__text">
                Once you're logged in, you can browse through the list of available restaurants on the Eatly website.
                You can filter by cuisine, price, and distance to find the perfect restaurant for your needs.
              </p>
              <p class="card-detail__text">
                Explore different options, read reviews, and decide on your favorite dishes. The Eatly platform offers convenient categories and a smooth filtering experience.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Filter restaurants by cuisine type</li>
                <li class="card-detail__item">Sort by price or distance</li>
                <li class="card-detail__item">Read customer reviews</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-1-2">
              <h2 class="card-detail__subtitle" id="section-title-1-2">Select Your Items</h2>
              <p class="card-detail__text">
                Choose your desired dishes from the restaurant's menu. You can customize orders by adding special instructions or removing ingredients.
              </p>
              <p class="card-detail__text">
                The system allows you to select portion sizes and add extras. Review your choices before proceeding to checkout.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-1-3">
              <h2 class="card-detail__subtitle" id="section-title-1-3">Place Your Order</h2>
              <p class="card-detail__text">
                Once you've made your final selection, review your cart for accuracy. Choose a delivery method and confirm your payment.
              </p>
              <p class="card-detail__text">
                You'll receive a confirmation email or notification with estimated delivery time. Track your order in real-time through the app.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "How To Track The Order ?",
        image: "../images/article/2.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-2">

            <div class="card-detail__section" aria-labelledby="section-title-2-1">
              <h2 class="card-detail__subtitle" id="section-title-2-1">Enable Notifications</h2>
              <p class="card-detail__text">
                After placing your order, ensure notifications are enabled in your account settings. You'll receive real-time updates via email and push notifications.
              </p>
              <p class="card-detail__text">
                Notifications are sent when your food is being prepared, picked up by the courier, and when approaching your location.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Turn on push notifications</li>
                <li class="card-detail__item">Enable email alerts</li>
                <li class="card-detail__item">Check SMS updates</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-2-2">
              <h2 class="card-detail__subtitle" id="section-title-2-2">Use In-App Tracking</h2>
              <p class="card-detail__text">
                Open the app and go to the "Orders" section to view your current order status with a progress bar and estimated delivery window.
              </p>
              <p class="card-detail__text">
                You can see the courier's name, vehicle type, and contact them if needed. The map shows real-time location updates.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-2-3">
              <h2 class="card-detail__subtitle" id="section-title-2-3">Delivery Confirmation</h2>
              <p class="card-detail__text">
                When your order arrives, you'll receive a final notification. Confirm delivery through the app and rate your experience.
              </p>
              <p class="card-detail__text">
                Your order history is saved for future reference. You can reorder favorite meals with one click.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "How To Manage Cards ?",
        image: "../images/article/3.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-3">

            <div class="card-detail__section" aria-labelledby="section-title-3-1">
              <h2 class="card-detail__subtitle" id="section-title-3-1">Adding Payment Cards</h2>
              <p class="card-detail__text">
                Navigate to "Payment Methods" in your account settings to add new cards. Enter card details carefully and verify through your bank's authentication.
              </p>
              <p class="card-detail__text">
                You can add multiple cards and set a default for faster checkout. Nickname your cards for easy identification.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Supported credit/debit cards</li>
                <li class="card-detail__item">Secure verification process</li>
                <li class="card-detail__item">Default payment selection</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-3-2">
              <h2 class="card-detail__subtitle" id="section-title-3-2">Managing Active Cards</h2>
              <p class="card-detail__text">
                Easily enable or disable cards without removing them permanently. This is useful for travel or security purposes.
              </p>
              <p class="card-detail__text">
                Ensure your default card is active to avoid payment failures. Delete old cards no longer in use to maintain security.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-3-3">
              <h2 class="card-detail__subtitle" id="section-title-3-3">Payment Security</h2>
              <p class="card-detail__text">
                Monitor card activity regularly. Update CVV and expiration dates when your physical card is renewed.
              </p>
              <p class="card-detail__text">
                Use strong passwords and two-factor authentication. Set transaction alerts for added security.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "Tips & Tricks For Business",
        image: "../images/article/4.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-4">

            <div class="card-detail__section" aria-labelledby="section-title-4-1">
              <h2 class="card-detail__subtitle" id="section-title-4-1">Time Management</h2>
              <p class="card-detail__text">
                Use digital planners and automate routine tasks. Set realistic daily goals and prioritize by urgency and importance.
              </p>
              <p class="card-detail__text">
                Time blocking and batch tasking can significantly improve productivity. Avoid multitasking unless absolutely necessary.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Digital planning tools</li>
                <li class="card-detail__item">Task automation</li>
                <li class="card-detail__item">Priority matrix</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-4-2">
              <h2 class="card-detail__subtitle" id="section-title-4-2">Communication Channels</h2>
              <p class="card-detail__text">
                Use effective tools like Slack for chats and Trello for task management. Set clear communication expectations.
              </p>
              <p class="card-detail__text">
                Document everything in shared spaces. Clear communication reduces errors and improves decision-making.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-4-3">
              <h2 class="card-detail__subtitle" id="section-title-4-3">Team Productivity</h2>
              <p class="card-detail__text">
                Regular check-ins keep teams aligned. Recognize achievements and provide constructive feedback.
              </p>
              <p class="card-detail__text">
                Foster a culture of continuous improvement. Encourage skill development and knowledge sharing.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "How To Control Money ?",
        image: "../images/article/5.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-5">

            <div class="card-detail__section" aria-labelledby="section-title-5-1">
              <h2 class="card-detail__subtitle" id="section-title-5-1">Track Every Expense</h2>
              <p class="card-detail__text">
                Use budgeting apps to record all expenses. Categorize spending to identify patterns and unnecessary purchases.
              </p>
              <p class="card-detail__text">
                Awareness of spending habits helps in making informed financial decisions and cutting back where needed.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Expense tracking apps</li>
                <li class="card-detail__item">Spending categories</li>
                <li class="card-detail__item">Monthly reviews</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-5-2">
              <h2 class="card-detail__subtitle" id="section-title-5-2">Automate Savings</h2>
              <p class="card-detail__text">
                Set up automatic transfers to savings accounts. Treat savings like a fixed expense using the 50/30/20 rule.
              </p>
              <p class="card-detail__text">
                Consider regular small investments in diversified funds. Financial control requires consistent habits.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-5-3">
              <h2 class="card-detail__subtitle" id="section-title-5-3">Smart Spending</h2>
              <p class="card-detail__text">
                Compare prices before purchases. Take advantage of discounts and cashback offers when appropriate.
              </p>
              <p class="card-detail__text">
                Delay impulse buys and prioritize needs over wants. Quality purchases often save money long-term.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "Top 5 Business Ideas",
        image: "../images/article/6.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-6">

            <div class="card-detail__section" aria-labelledby="section-title-6-1">
              <h2 class="card-detail__subtitle" id="section-title-6-1">Subscription Boxes</h2>
              <p class="card-detail__text">
                Curated subscription services for niche interests have low startup costs and build loyal customer bases.
              </p>
              <p class="card-detail__text">
                From snacks to books to specialty items, these provide recurring revenue with proper execution.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-6-2">
              <h2 class="card-detail__subtitle" id="section-title-6-2">Digital Products</h2>
              <p class="card-detail__text">
                Create and sell e-books, templates, or online courses. These require upfront effort but scale easily.
              </p>
              <p class="card-detail__text">
                Ideal for experts and educators to monetize knowledge with minimal ongoing maintenance.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-6-3">
              <h2 class="card-detail__subtitle" id="section-title-6-3">Local Delivery Services</h2>
              <p class="card-detail__text">
                Specialized local delivery fills gaps in the market. Focus on specific needs like groceries or pharmacy items.
              </p>
              <p class="card-detail__text">
                Build relationships with local businesses and offer reliable, personalized service.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "Internet privacy",
        image: "../images/article/2.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-7">

            <div class="card-detail__section" aria-labelledby="section-title-7-1">
              <h2 class="card-detail__subtitle" id="section-title-7-1">Secure Your Devices</h2>
              <p class="card-detail__text">
                Keep all devices updated with security patches. Use antivirus software and enable firewalls for protection.
              </p>
              <p class="card-detail__text">
                Avoid suspicious downloads and links. Encrypt data and use VPNs to mask your online activity.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Regular system updates</li>
                <li class="card-detail__item">VPN services</li>
                <li class="card-detail__item">Data encryption</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-7-2">
              <h2 class="card-detail__subtitle" id="section-title-7-2">Strong Passwords</h2>
              <p class="card-detail__text">
                Use complex, unique passwords for each account. Consider a password manager for secure storage.
              </p>
              <p class="card-detail__text">
                Enable two-factor authentication everywhere possible. Change passwords regularly and after any breach.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-7-3">
              <h2 class="card-detail__subtitle" id="section-title-7-3">Privacy Settings</h2>
              <p class="card-detail__text">
                Review and adjust privacy settings on all platforms. Limit data sharing with third parties.
              </p>
              <p class="card-detail__text">
                Be cautious about what personal information you share publicly. Regularly audit app permissions.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "Strong Team",
        image: "../images/article/5.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-8">

            <div class="card-detail__section" aria-labelledby="section-title-8-1">
              <h2 class="card-detail__subtitle" id="section-title-8-1">Clear Roles and Goals</h2>
              <p class="card-detail__text">
                Define responsibilities based on skills and interests. Set collective goals with measurable KPIs.
              </p>
              <p class="card-detail__text">
                Ensure all members understand their contribution. Regular feedback keeps communication open.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Role definition</li>
                <li class="card-detail__item">Goal alignment</li>
                <li class="card-detail__item">Feedback culture</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-8-2">
              <h2 class="card-detail__subtitle" id="section-title-8-2">Encourage Collaboration</h2>
              <p class="card-detail__text">
                Use tools like Slack and Trello for seamless communication. Schedule regular check-ins and brainstorming.
              </p>
              <p class="card-detail__text">
                Recognize efforts and reward teamwork. Shared victories strengthen team bonds.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-8-3">
              <h2 class="card-detail__subtitle" id="section-title-8-3">Team Development</h2>
              <p class="card-detail__text">
                Invest in training and skill development. Create opportunities for cross-functional learning.
              </p>
              <p class="card-detail__text">
                Foster an inclusive environment where diverse perspectives are valued. Strong teams grow together.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "How To Balance Work And Life?",
        image: "../images/article/1.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-9">

            <div class="card-detail__section" aria-labelledby="section-title-9-1">
              <h2 class="card-detail__subtitle" id="section-title-9-1">Set Boundaries</h2>
              <p class="card-detail__text">
                Define working hours and stick to them. Avoid checking emails after hours unless critical.
              </p>
              <p class="card-detail__text">
                Dedicate time for relaxation and social connections. Time-blocking helps allocate time fairly.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Fixed work schedule</li>
                <li class="card-detail__item">Digital detox periods</li>
                <li class="card-detail__item">Personal time protection</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-9-2">
              <h2 class="card-detail__subtitle" id="section-title-9-2">Prioritize Self-Care</h2>
              <p class="card-detail__text">
                Incorporate exercise and mindfulness into routines. Make time for proper meals and sufficient sleep.
              </p>
              <p class="card-detail__text">
                Track energy levels and adjust workloads accordingly. Prevent burnout with consistent self-care.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-9-3">
              <h2 class="card-detail__subtitle" id="section-title-9-3">Efficient Work Habits</h2>
              <p class="card-detail__text">
                Focus on productivity, not just hours worked. Delegate when possible and avoid perfectionism.
              </p>
              <p class="card-detail__text">
                Use technology to streamline tasks. Quality work doesn't require constant availability.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "How To Grow On Social Media?",
        image: "../images/article/3.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-10">

            <div class="card-detail__section" aria-labelledby="section-title-10-1">
              <h2 class="card-detail__subtitle" id="section-title-10-1">Know Your Audience</h2>
              <p class="card-detail__text">
                Analyze demographics and interests. Tailor content to resonate with your target followers.
              </p>
              <p class="card-detail__text">
                Use analytics to refine strategy. Interactive formats like polls boost engagement.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Audience research</li>
                <li class="card-detail__item">Content personalization</li>
                <li class="card-detail__item">Engagement analytics</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-10-2">
              <h2 class="card-detail__subtitle" id="section-title-10-2">Be Authentic</h2>
              <p class="card-detail__text">
                Share your story and values. Authenticity builds trust with your audience.
              </p>
              <p class="card-detail__text">
                Maintain consistent branding. Experiment while staying true to your identity.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-10-3">
              <h2 class="card-detail__subtitle" id="section-title-10-3">Content Strategy</h2>
              <p class="card-detail__text">
                Plan content in advance using calendars. Post regularly with focus on quality.
              </p>
              <p class="card-detail__text">
                Leverage trends while providing value. Consistency and value drive long-term growth.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "How To Deal With Failure?",
        image: "../images/article/6.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-11">

            <div class="card-detail__section" aria-labelledby="section-title-11-1">
              <h2 class="card-detail__subtitle" id="section-title-11-1">Accept and Analyze</h2>
              <p class="card-detail__text">
                View failure as feedback, not defeat. Analyze what went wrong without self-judgment.
              </p>
              <p class="card-detail__text">
                Identify patterns to avoid repeating mistakes. Many successes stem from prior setbacks.
              </p>
              <ul class="card-detail__list">
                <li class="card-detail__item">Objective analysis</li>
                <li class="card-detail__item">Pattern recognition</li>
                <li class="card-detail__item">Mindset shift</li>
              </ul>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-11-2">
              <h2 class="card-detail__subtitle" id="section-title-11-2">Recover Strategically</h2>
              <p class="card-detail__text">
                Process emotions healthily. Seek support from mentors or peers.
              </p>
              <p class="card-detail__text">
                Create a new action plan with realistic steps. Start small and build momentum.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-11-3">
              <h2 class="card-detail__subtitle" id="section-title-11-3">Build Resilience</h2>
              <p class="card-detail__text">
                Each recovery makes you more adaptable. Focus on progress, not perfection.
              </p>
              <p class="card-detail__text">
                Develop coping strategies for future challenges. Resilience is a learned skill.
              </p>
            </div>
          </article>
        `
      },
      {
        title: "Top 5 Eco-Friendly Habits",
        image: "../images/article/4.jpg",
        content: `
          <article class="card-detail" aria-labelledby="card-title-12">

            <div class="card-detail__section" aria-labelledby="section-title-12-1">
              <h2 class="card-detail__subtitle" id="section-title-12-1">Reusable Shopping Bags</h2>
              <p class="card-detail__text">
                Switch from plastic to reusable bags. Keep them handy to reduce single-use waste.
              </p>
              <p class="card-detail__text">
                Durable options last years and significantly lower environmental impact.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-12-2">
              <h2 class="card-detail__subtitle" id="section-title-12-2">Energy-Efficient Lighting</h2>
              <p class="card-detail__text">
                Replace incandescent bulbs with LEDs. They use less energy and last longer.
              </p>
              <p class="card-detail__text">
                Smart lighting systems further optimize energy use throughout your home.
              </p>
            </div>

            <div class="card-detail__section" aria-labelledby="section-title-12-3">
              <h2 class="card-detail__subtitle" id="section-title-12-3">Waste Sorting</h2>
              <p class="card-detail__text">
                Properly separate recyclables, organic waste, and trash. Improves recycling efficiency.
              </p>
              <p class="card-detail__text">
                Reduces landfill overflow and supports circular economy initiatives.
              </p>
            </div>
          </article>
        `
      }
    ]

    return articlesData.map((article, index) => ({
      id: index + 1,
      title: article.title,
      image: article.image,
      content: article.content
    }))
  }

  init() {
    this.faq = document.querySelector(this.selectors.faq)
    this.discount = document.querySelector(this.selectors.discount)
    this.articlesView = document.querySelector(this.selectors.articlesView)
    this.articlesGrid = document.querySelector(this.selectors.articlesGrid)
    this.prevBtn = document.querySelector(this.selectors.prevBtn)
    this.nextBtn = document.querySelector(this.selectors.nextBtn)
    this.articleView = document.querySelector(this.selectors.articleView)
    this.articleImage = document.querySelector(this.selectors.articleImage)
    this.articleTitle = document.querySelector(this.selectors.articleTitle)
    this.articleBody = document.querySelector(this.selectors.articleBody)
    this.articleNextBtn = document.querySelector(this.selectors.articleNextBtn)
    this.relatedList = document.querySelector(this.selectors.relatedList)

    // проверка на существование элементов
    if (!this.prevBtn || !this.nextBtn || !this.articleNextBtn) {
      // console.error('Не найдены необходимые элементы управления')
      return
    }

    this.prevBtn.addEventListener('click', () => {
      this.changePage(-1)
    })
    this.nextBtn.addEventListener('click', () => {
      this.changePage(1)
    })
    this.articleNextBtn.addEventListener('click', () => {
      this.nextArticle()
    })

    this.renderPage() // первоначальный рендеринг
  }


  /**
   * Рендерит главную страницу со списком статей
   */
  renderPage() {
    // показываем главную страницу и скрываем детальную
    this.toggleSectionVisibility(this.faq, false)
    this.toggleSectionVisibility(this.discount, false)
    // this.toggleSectionVisibility(this.articlesView, false)
    this.articleView.style.display = 'none'
    this.toggleSectionVisibility(this.articlesView, false)

    // вычисляем максимальное количество страниц
    // const maxPage = Math.floor((this.state.articles.length - 1) / this.state.perPage)
    const maxPage = Math.ceil(this.state.articles.length / this.state.perPage) - 1


    // управление состоянием кнопок навигации
    this.prevBtn.toggleAttribute(this.stateAttribute.disabled, this.state.currentPage === 0)
    this.nextBtn.toggleAttribute(this.stateAttribute.disabled, this.state.currentPage === maxPage)

    // вычисляем статьи для текущей страницы
    const startIdx = this.state.currentPage * this.state.perPage
    const endIdx = startIdx + this.state.perPage
    const articlesToShow = this.state.articles.slice(startIdx, endIdx)

    // очищаем сетку перед рендером
    this.articlesGrid.innerHTML = ''

    // рендерим статьи в виде карточек
    articlesToShow.forEach((article) => {
      const item = document.createElement('li')
      item.className = 'articles__item'
      item.tabIndex = 0
      item.setAttribute(this.stateAttribute.ariaLabel, article.title)

      item.innerHTML = `
       <img class="articles__item-image" src="${article.image}" alt="" />
        <h3 class="articles__item-title">${article.title}</h3>
        <div class="articles__item-info">
        <div class="articles__item-info-user">
          <img class="articles__item-info-image" src="../images/article/ava.png" alt="" width="43.7" height="43.7">
          <div class="articles__item-author">
            <p class="articles__item-info-subtitle">Written By</p>
            <h4 class="articles__item-info-title">Perperzon</h4>
          </div>
        </div>
        <time class="articles__item-info-time datetime="2022-12-15">15 DEC, 2022</time>
        </div>


      `

      // обработчики для клика и клавиатуры ДОБАВИТЬ ДОП ФУНКЦИОНАЛ
      item.addEventListener('click', () => this.openArticle(article.id))
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          this.openArticle(article.id)
        }
      })
      this.articlesGrid.appendChild(item)
    })
  }


   /**
   * переключаем видимость элемента
   * @param {HTMLElement} element
   * @param {boolean} hide
   */
   toggleSectionVisibility(element, hide) {
    if (!element) return

    if (hide) {
      element.setAttribute(this.stateAttribute.hidden, '')
    } else {
      element.removeAttribute(this.stateAttribute.hidden)
    }
  }

  /**
   *  изменяем текущую страницу
   * @param {number} direction направление (-1 для предыдущей, 1 для следующей)
   */
  changePage(direction) {
    const maxPage = Math.floor((this.state.articles.length -1 ) / this.state.perPage)
    let nextPage = this.state.currentPage + direction

    // проверяем границы
    if (nextPage < 0) {
      nextPage = 0
    }

    if (nextPage > maxPage) {
      nextPage = maxPage
    }

    // если страница изменилась - обновляем рендер
    if (nextPage !== this.state.currentPage) {
      this.state.currentPage = nextPage
      this.renderPage()
    }
  }


  /**
   * открываем статью в детальном просмотре
   * @param {number} id id статьи
   */
  openArticle(id) {
    this.state.currentArticleId = id
    this.toggleSectionVisibility(this.faq, true)
    this.toggleSectionVisibility(this.discount, true)
    // this.toggleSectionVisibility(this.articlesView, true)
    this.articleView.style.display = 'block'
    this.toggleSectionVisibility(this.articlesView, true)

    // находим нужную статью
    const article = this.state.articles.find(a => a.id === id)
    if (!article) return

    // заполняем данные статьи
    this.articleImage.src = article.image
    this.articleTitle.textContent = article.title
    this.articleBody.innerHTML = article.content

    // фокусируем заголовок статьи (для доступности)
    this.articleTitle.focus()

    // рендерим оставшиеся статьи (все кроме текущей)
    this.renderRelatedArticles()
  }

  /**
   * рендерим оставшиеся статьи (все кроме текущей)
   */
  renderRelatedArticles() {
    this.relatedList.innerHTML = ''

    // для каждой статьи кроме текущей
    this.state.articles.forEach((article) => {
      if (article.id === this.state.currentArticleId) return

      // создаем карточку связанной статьи (оставшийся статьи)
      const item = document.createElement('li')
      item.className = 'related__item'
      item.tabIndex = 0
      item.setAttribute(this.stateAttribute.ariaLabel, article.title)

      item.innerHTML = `
        <img class="related__item-image" src="${article.image}" />
        <h3 class="related__item-title">${article.title}</h3>
        <div class="articles__item-info">
         <div class="articles__item-info-user">
          <img class="articles__item-info-image" src="../images/article/ava.png" alt="" width="43.7" height="43.7">
          <div class="articles__item-author">
            <p class="articles__item-info-subtitle">Written By</p>
            <h4 class="articles__item-info-title">Perperzon</h4>
          </div>
        </div>
        <time class="articles__item-info-time datetime="2022-12-15">15 DEC, 2022</time>
        </div>

      `

      item.addEventListener('click', () => this.openArticle(article.id))
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          this.openArticle(article.id)
        }
      })
      this.relatedList.appendChild(item)
    })

    // сбрасываем скролл наверх (опционально)
    this.relatedList.scrollTop = 0
  }

  /**
   * Открываем следующую статью из списка связанных
   */
  nextArticle() {
    // найдем индекс текущей статьи
    const currentIndex = this.state.articles.findIndex(a => a.id === this.state.currentArticleId)
    if (currentIndex === -1) return

    // вычисляем индекс следующей статьи (с зацикливанием)
    let nextIndex = (currentIndex + 1) % this.state.articles.length

    // если следующая статья та же самая - пропускаем
    if (this.state.articles[nextIndex].id === this.state.currentArticleId) {
      nextIndex = (nextIndex + 1) % this.state.articles.length
    }

    // открываем следующую статью
    this.openArticle(this.state.articles[nextIndex].id)

    // прокручиваем к ней список связанных
    this.scrollRelatedIntoView(nextIndex)
  }

  /**
   * прокручиваем список связанных статей к указанной статье
   * @param {number} articleId ID статьи, к которой нужно прокрутить
   */
  scrollRelatedIntoView(articleId) {
    const relatedItems = this.relatedList.querySelectorAll('.related__item')

     // ищем нужную статью по заголовку (aria-label)
    for (let i = 0; i < relatedItems.length; i++) {
      const item = relatedItems[i]
      const articleTitle = this.state.articles.find(a => a.id === articleId)?.title

      // если заголовок совпадает, прокручиваем к этому элементу
      if (item.getAttribute('aria-label') === articleTitle) {
        item.scrollIntoView({
          behavior: 'smooth', // плавная прокрутка
          block: 'start',
        })

        // добавляем класс для стилизации (в будущем)
        this.highlightNextArticle(relatedItems, i)
        return
      }
    }
  }

  /**
   * добавляем стиль для следующей статьи в списке
   * @param {NodeList} items - все элементы списка
   * @param {number} currentIndex - индекс текущей статьи
   */
  highlightNextArticle(items, currentIndex) {
    // удаляем класс подсветки у всех элементов
    items.forEach(item => item.classList.remove('related__item--next'));

    // вычисляем индекс следующей статьи (с зацикливанием)
    const nextIndex = (currentIndex + 1) % items.length;

    // добавляем класс подсветки следующей статье
    items[nextIndex].classList.add('related__item--next');
  }
}

export default Blog