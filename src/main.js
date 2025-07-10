import getImagesByQuery from "./js/pixabay-api.js";
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formSubmit = document.querySelector(".form");

let inputValue = "";
let lastInputValue = '';
let currentPage = 0;

//TODO create gallery => submit trigger
formSubmit.addEventListener("submit", async function (e) {
    e.preventDefault();
    hideLoadMoreButton()
    currentPage = 0;
    inputValue = formSubmit.elements["search-text"].value.trim();
    lastInputValue = inputValue;
    clearGallery();
    const images = await getImages(currentPage);
    createGallery(images);
    if (images.length >= 1) {
        showLoadMoreButton()
    }
});

//TODO get images by input value, show iziToast messages
async function getImages(currentPage) {
    const iziToastDefaults = {
        position: "topRight",
        timeout: 4000,
        close: true,
        progressBar: true,
        icon: "fas fa-check",
        closeOnClick: false,
        pauseOnHover: true,
    };
    try {
        showLoader();
        const imagesArr = await getImagesByQuery(inputValue, currentPage);

        if (imagesArr.length === 0) {
            iziToast.warning({
                message:
                    "Sorry, there are no images matching <br> your search query. Please try again!",
                color: "red",
                ...iziToastDefaults,
            });

            return [];
        }
        return imagesArr;
    } catch (error) {
        iziToast.error({
            message: `Oops, something went wrong! ${error}`,
            color: "red",
            ...iziToastDefaults,
        });
        return [];
    } finally {
        hideLoader();
    }
}

    const btnLoadMoreButton = document.querySelector(".js-load-more-btn");

        btnLoadMoreButton.addEventListener("click", async function () {
            if (lastInputValue === inputValue) {
                currentPage++
                const images = await getImages(currentPage)
                const totalPages = images.length

                if (images.length > 0) {
                    createGallery(images);
                } else {
                    hideLoadMoreButton();
                }
            }
          })



