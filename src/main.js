import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formSubmit = document.querySelector('.form');

let inputValue = '';
let lastInputValue = '';
let currentPage = 1;
const iziToastDefaults = {
  position: 'topRight',
  timeout: 4000,
  close: true,
  progressBar: true,
  icon: 'fas fa-check',
  closeOnClick: false,
  pauseOnHover: true,
};

//TODO create gallery => submit trigger
formSubmit.addEventListener('submit', async function (e) {
  e.preventDefault();
  hideLoadMoreButton();
  if (formSubmit.elements['search-text'].value.trim() === '') {
    iziToast.warning({
      message: "Input value can't be empty!",
      color: 'red',
      ...iziToastDefaults,
    });
    return;
  }
  inputValue = formSubmit.elements['search-text'].value.trim();

  lastInputValue = inputValue;
  currentPage = 1;
  clearGallery();
  const imagesObj = await getImages(currentPage);
  const images = imagesObj.hits;
  createGallery(images);
  if (images.length >= 15) {
    showLoadMoreButton();
  }
});

//TODO get images by input value, show iziToast messages
let isLoading = false;
async function getImages(currentPage) {
  if (isLoading) {
    return [];
  }
  isLoading = true;
  showLoader();
  try {
    const getObjFromAPI = await getImagesByQuery(inputValue, currentPage);
    if (getObjFromAPI.hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching <br> your search query. Please try again!',
        color: 'red',
        ...iziToastDefaults,
      });

      return [];
    }
    return getObjFromAPI;
  } catch (error) {
    iziToast.error({
      message: `Oops, something went wrong! ${error}`,
      color: 'red',
      ...iziToastDefaults,
    });
    return [];
  } finally {
    hideLoader();
    isLoading = false;
  }
}

const btnLoadMoreButton = document.querySelector('.js-load-more-btn');

btnLoadMoreButton.addEventListener('click', async function () {
  if (lastInputValue === inputValue) {
    currentPage++;

    const imagesObject = await getImages(currentPage);
    const availableImg = imagesObject.totalHits;
    const availablePages = Math.ceil(availableImg / 15);

    if (currentPage >= availablePages || availableImg < 15) {
      hideLoadMoreButton();
      iziToast.warning({
        message: "We are sorry, but you've reached the end of search results",
        color: 'red',
        ...iziToastDefaults,
      });
    }

    const imgArr = imagesObject.hits;
    if (imgArr?.length > 0) {
      createGallery(imgArr);
      smoothScroll();
    } else {
      hideLoadMoreButton();
    }
  }
});

function smoothScroll() {
  const smallImg = document.querySelector('li');
  const rect = smallImg.getBoundingClientRect();
  const doubleHeight = rect.height * 2;
  window.scrollBy({
    top: doubleHeight,
    behavior: 'smooth',
  });
}
