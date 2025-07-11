import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//TODO default settings for simplelightbox
const lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionDelay: 250,
});
const gallery = document.querySelector('.gallery');

//TODO create and add gallery to DOM
function createGallery(hits) {
  let markup = '';
  console.log(hits);
  hits?.forEach(image => {
    markup += `<li> 
      <a href= "${image.largeImageURL}" class="large-img">
       <img src="${image.webformatURL}" class="small-img" alt="${image.tags}">
       </a>
       <div class="under-image-info">
       <p> <span> Likes </span> <br> ${image.likes} </p>
       <p> <span> Views </span> <br> ${image.views} </p>
       <p> <span> Comments </span> <br> ${image.comments} </p>
       <p> <span> Downloads </span> <br> ${image.downloads} </p>
       </div>

    </li> `;
  });
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
//TODO clear gallery through innerHTML
function clearGallery() {
  const gallery = document.querySelector('.gallery'); // или ваш селектор
  if (gallery) {
    gallery.innerHTML = '';
  }
}

//TODO show spinner
function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'block';
  }
}
//TODO hide spinner
function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

const btnLoadMore = document.querySelector('.js-load-more-btn');

const showLoadMoreButton = () => (btnLoadMore.style.display = 'block');
const hideLoadMoreButton = () => (btnLoadMore.style.display = 'none');

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};
