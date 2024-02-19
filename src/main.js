import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { templateImages } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnloadmore = document.querySelector('.load_button');

form.addEventListener('submit', onCreateFormSubmit);
btnloadmore.addEventListener('click', onLoadMoreItems);

let query;
let page;
let maxPage;

async function onCreateFormSubmit(event) {
  event.preventDefault();
  query = event.target.elements.query.value.trim();
  page = 1;
  if (query === '') {
    return iziToast.error({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
  }

  loader.style.display = 'inline-block';

  gallery.innerHTML = '';
  const data = await fetchImages(query, page);
  console.log(data);
  maxPage = Math.ceil(data.totalHits / 15);
  // renderArticle(data.article);

  checkBtnVisibleStatus();
  event.target.reset();
}

async function onLoadMoreItems() {
  page += 1;
  const data = await fetchImages(query, page);
  renderArticle(data.articles);
  checkBtnVisibleStatus();
}

function renderArticle(articles) {
  const markup = templateImages(articles);
  gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoadBtn() {
  btnloadmore.classList.remove('hidden');
}

function hiddenLoadBtn() {
  btnloadmore.classList.add('hidden');
}

function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hiddenLoadBtn();
  } else {
    showLoadBtn();
  }
}
