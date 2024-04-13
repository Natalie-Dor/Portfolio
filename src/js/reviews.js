import { getData } from '@/js/api.js';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';

const swiper = new Swiper('.swiper-review', {
  modules: [Navigation, Autoplay],

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    // when window width is >= 640px
    1440: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next-review',
    prevEl: '.swiper-button-prev-review',
    disabledClass: 'swiper-button-disabled',
  },
});
const reviewsEl = document.querySelector('.reviews-cards');
console.log(swiper);
console.log(reviewsEl);
//=========================================================================
async function getReviews() {
  try {
    const data = await getData();
    console.log(data);
    renderReviews(data);
  } catch (error) {
    console.error(error);
    alert('Not found');
    renderReviews([]);
  }
}
getReviews();

//=========================================================================

function renderReviews(reviews) {
  if (reviews.length === 0) {
    reviewsEl.innerHTML = '<p>Not found</p>';
    return;
  }

  const markup = reviews
    .map(review => {
      return `<div class="swiper-slide reviews-card-item ">
        <img
          src="${review.avatar_url}"
          alt="${review.author}"
          width="48"
          height="48"
          class="reviews-item-img"
        />
        <h3 class="text-title reviews-card-text-title">${review.author}</h3>
        <p class="text reviews-card-text">${review.review}</p>
      </div>`;
    })
    .join('');
  reviewsEl.insertAdjacentHTML('beforeend', markup);
}

//=========================================================================
