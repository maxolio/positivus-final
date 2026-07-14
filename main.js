import Slider from './modules/Slider.js';

document.addEventListener('DOMContentLoaded', () => {
  const reviewsSection = document.querySelector('.reviews');

  if (reviewsSection) {
    new Slider(reviewsSection);
  }
});