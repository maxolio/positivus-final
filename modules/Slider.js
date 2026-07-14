export default class Slider {
  constructor(container) {
    this.container = container;

    // Ищем контейнеры и элементы через data-атрибуты
    this.sliderList = this.container.querySelector('[data-js-slider-list]');
    this.items = Array.from(this.sliderList.children);

    this.leftBtn = this.container.querySelector('[data-js-left-button]');
    this.rightBtn = this.container.querySelector('[data-js-right-button]');

    // Находим все кнопки пагинации по атрибуту
    this.paginationButtons = this.container.querySelectorAll('[data-js-pagination-button]');

    this.init();
  }

  init() {
    this.leftBtn.addEventListener('click', () => this.scroll(-1));
    this.rightBtn.addEventListener('click', () => this.scroll(1));

    this.paginationButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this.goToSlide(index));
    });

    this.setupObserver();
  }

  goToSlide(index) {
    const gap = 50;
    const itemWidth = this.items[0].offsetWidth + gap;
    this.sliderList.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
  }

  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = this.items.indexOf(entry.target);
          this.updatePagination(index);
        }
      });
    }, { root: this.sliderList, threshold: 1 });

    this.items.forEach(item => observer.observe(item));
  }

  updatePagination(index) {
    this.paginationButtons.forEach((btn, i) => {
      // is-current — единственный класс, который остался для связи со стилями
      btn.classList.toggle('is-current', i === index);
    });
  }

  scroll(direction) {
    const gap = 50;
    const itemWidth = this.items[0].offsetWidth + gap;
    this.sliderList.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
  }
}