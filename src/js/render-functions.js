import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

export function renderTicker(data) {
  const markup = data.hits.map(templateImage).join('');
  gallery.innerHTML = markup;

  const galleryLinks = document.querySelectorAll('.gallery-link');
  galleryLinks.forEach(link => {
    link.setAttribute('href', link.querySelector('img').getAttribute('src'));
  });

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
}

function templateImage(article) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = article;
  return `<li class="gallery-item" >
    <a class="gallery-link" href="${largeImageURL}">
      <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"
      />
    </a>
    <div class="item-text">
      <ul>Likes<li>${likes}</li></ul>
      <ul>Views<li>${views}</li></ul>
      <ul>Comments<li>${comments}</li></ul>
      <ul>Downloads<li>${downloads}</li></ul>
    </div>
  </li>`;
}

export function templateImages(articles) {
  return articles.map(templateImage).join('');
}
