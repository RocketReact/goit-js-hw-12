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

//TODO create gallery => submit trigger
formSubmit.addEventListener("submit", async function (e) {
    e.preventDefault();
    inputValue = formSubmit.elements["search-text"].value;
    clearGallery();
    const images = await getImages();
    createGallery(images);
});

//TODO get images by input value, show iziToast messages
async function getImages() {
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
        const imagesArr = await getImagesByQuery(inputValue);

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
