import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

import { renderTicker } from './render-functions.js';

const loader = document.querySelector('.loader');

export async function fetchImages(query, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '42272316-28c697ce0580eb37211383c7d';
  const IMAGE_TYPE = 'image_type=photo';
  const ORIENTATION = '&orientation=horizontal';
  const SAFESEARCH = '&safesearch=true';
  const url = `${BASE_URL}?key=${KEY}&${IMAGE_TYPE}${ORIENTATION}${SAFESEARCH}`;

  const params = {
    key: KEY,
    q: query,
    per_page: 15,
    page: currentPage,
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data && response.data.hits && response.data.hits.length > 0) {
      renderTicker(response.data);
    } else {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loader.style.display = 'none';
  }
}
