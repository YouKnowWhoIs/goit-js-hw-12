import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input');
const loadMoreBtn = document.querySelector('.load_button');
const loader = document.querySelector('.loader');

let page;
let searchTerm = '';
let maxPage = 1;

form.addEventListener('submit', onCreateFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreItems);

async function onCreateFormSubmit(event) {
  event.preventDefault();
  searchTerm = input.value.trim();
  page = 1;

  if (!searchTerm) {
    return iziToast.error({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
  }

  gallery.innerHTML = '';

  try {
    await fetchImages();
  } catch (error) {
    console.error(error);
    iziToast.error({
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
  }

  event.target.reset();
}

async function onLoadMoreItems() {
  page += 1;

  try {
    await fetchImages();
  } catch (error) {
    console.error(error);
    iziToast.error({
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
  }

  const height = gallery.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

async function fetchImages() {
  showLoader();
  checkBtnVisibleStatus();
  const apiKey = '42288638-d7f8a30b0a31b090439479823';
  const perPage = 15;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    maxPage = Math.ceil(data.totalHits / perPage) || 1;
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      const markup = data.hits
        .map(hits => {
          return `<li class="gallery-item" >
    <a class="gallery-link" href="${hits.largeImageURL}">
      <img
        class="gallery-image"
        src="${hits.webformatURL}"
        alt="${hits.tags}"
      />
    </a>
    <div class="item-text">
      <ul>Likes<li>${hits.likes}</li></ul>
      <ul>Views<li>${hits.views}</li></ul>
      <ul>Comments<li>${hits.comments}</li></ul>
      <ul>Downloads<li>${hits.downloads}</li></ul>
    </div>
  </li>`;
        })
        .join('');
      gallery.insertAdjacentHTML('beforeend', markup);
      const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionType: 'attr',
        captionsData: 'alt',
        captionPosition: 'bottom',
        fadeSpeed: 150,
        captionSelector: 'img',
        captionDelay: 250,
      });
      lightbox.on('show.simplelightbox').refresh();
      hideLoader();

      if (page >= maxPage) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }

  checkBtnVisibleStatus();
}

function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadBtn() {
  loadMoreBtn.classList.add('hidden');
}

function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hideLoadBtn();
  } else {
    showLoadBtn();
  }
}
