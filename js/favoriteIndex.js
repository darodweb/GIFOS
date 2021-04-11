import { api } from './services.js';
import { gif } from './gif.js';
import {
    URLTrendings, hamburger, menu, gifContainer, searchBtn, searchResults,
    searchTitle, HEADER, HERO, TRENDING_GIFOS, BORDER_TOP, BORDER_BOTTOM, DARK_MODE_TRIGGER, FOOTER, DAY_MODE_MENU,
    SEARCH_RESULTS_DIVIDER, SHOW_MORE_HOME, PREV_BUTTON, NEXT_BUTTON, SEARCH_RESULTS_CONTAINER, MODAL,
    FAVORITES_CONTAINER, URL_SEARCH_BY_ID
} from './constants.js';


// Get FAV Gifs

let favGifs = [];
const getFavGifs = () => {
    let favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem('favorites')) : [];


    if (favGifs.length > 0) {
        favGifs = favGifs.join(",");

        api.getGifs(URL_SEARCH_BY_ID + favGifs)
            .then(response => {
                gifs = [];
                for (let i = 0; i < response.data.length; i++) {
                    gifs.push(response.data[i]);
                }
                favInsertedGif();
            })
            .catch(error => console.log(error))

    } else {
        let noFavoritesMarkUp =
            `
            <div class="no-results-container">
                <img src="../../assets/icon-fav-sin-contenido.svg" alt="Sin favoritos">
                <p>¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</p>
            </div>
            `
        FAVORITES_CONTAINER.innerHTML = noFavoritesMarkUp;
    }

}

const favGifMarkup = (gif) => {
    return `
    <div class="favorites-gif__container">
        <img src="${gif.images.fixed_height_downsampled.url}"class="trending-gifos-gif" alt="${gif.title}">
        <div class="trending-gifos-gif__overlay" id="trending-gifos-gif__overlay"></div>
        <div class="icon-container">
            <i class="icon-fav-true" data-fav-id=${gif.id} title="Favorito"></i>
            <i class="icon-download" data-download-url=${gif.url}
                data-download-title=${gif.title}
                title="Descargar"></i>
            <i class="icon-expand" data-expand-url=${gif.images.fixed_height.url}
            data-expand-username=${gif.username} data-expand-title=${gif.title}
            data-expand-id=${gif.id}
            title="Expandir"></i>
        </div>
        <p class="gif-user">${gif.username}</p>
        <p class="gif-title">${gif.title}</p>
    </div>
    
    `
}

const favInsertedGif = () => {
    let gifCards = "";
    for (let i = 0; i < gifs.length; i++) {
        gifCards += favGifMarkup(gifs[i]);
    }
    FAVORITES_CONTAINER.innerHTML = gifCards;

}

getFavGifs();

// Add Trending Gifs Slider

let gifs = [];

const getTrendingGifs = () => {
    api.getGifs(URLTrendings)
        .then(response => {
            gifs = [];
            for (let i = 0; i < response.data.length; i++) {
                gifs.push(response.data[i]);
            }
            insertedGif();
        })
        .catch(error => console.log(error))
}

const gifMarkup = (gif) => {
    return `
    <div class="trending-gifos-gif__container">
        <img src="${gif.images.fixed_height_downsampled.url}"class="trending-gifos-gif" alt="${gif.title}">
        <div class="trending-gifos-gif__overlay" id="trending-gifos-gif__overlay"></div>
        <div class="icon-container">
            <i class="icon-fav-false" data-fav-id=${gif.id} title="Favorito"></i>
            <i class="icon-download" data-download-url=${gif.url}
                data-download-title=${gif.title}
                title="Descargar"></i>
            <i class="icon-expand" data-expand-url=${gif.images.fixed_height.url}
            data-expand-username=${gif.username} data-expand-title=${gif.title}
            data-expand-id=${gif.id}
            title="Expandir"></i>
        </div>
        <p class="gif-user">${gif.username}</p>
        <p class="gif-title">${gif.title}</p>
    </div>
    
    `
}

const insertedGif = () => {
    let gifCards = "";
    for (let i = 0; i < gifs.length; i++) {
        gifCards += gifMarkup(gifs[i]);
    }
    gifContainer.innerHTML = gifCards;

}

getTrendingGifs();

// FUNCTION TO SCROLL SLIDER ON HOME PAGE

function scrollToLeft(slider) {
    slider.scrollLeft += 350;
};

function scrollToRight(slider) {
    slider.scrollLeft -= 350;
};

PREV_BUTTON.addEventListener("click", () => {
    scrollToRight(gifContainer);
}, false);

NEXT_BUTTON.addEventListener("click", () => {
    scrollToLeft(gifContainer);
}, false);

//ADDING GIFS TO FAVORITOS

MODAL.addEventListener("click", (event) => {
    gif.closeModal(event, "close-modal-icon", MODAL);

}, true);

MODAL.addEventListener("click", (event) => {
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);

// Add download functionality to the download icon
MODAL.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);

// Add expand functionality to the expand icon - or to the gif itself for mobile
FAVORITES_CONTAINER.addEventListener("click", (event) => {
    gif.expand(
        event,
        "icon-expand",
        MODAL,
        "data-expand-url",
        "data-expand-title",
        "data-expand-username",
        "data-expand-id"
    );
}, true);

FAVORITES_CONTAINER.addEventListener("click", (event) => {
    gif.expand(
        event,
        "gif",
        MODAL,
        "data-gif-url",
        "data-gif-title",
        "data-gif-username",
        "data-gif-id"
    );
}, true);

gifContainer.addEventListener("click", (event) => {
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);

// Add download functionality to the download icon
gifContainer.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);

// Add expand functionality to the expand icon - or to the gif itself for mobile
gifContainer.addEventListener("click", (event) => {
    gif.expand(
        event,
        "icon-expand",
        MODAL,
        "data-expand-url",
        "data-expand-title",
        "data-expand-username",
        "data-expand-id"
    );
}, true);

gifContainer.addEventListener("click", (event) => {
    gif.expand(
        event,
        "gif",
        MODAL,
        "data-gif-url",
        "data-gif-title",
        "data-gif-username",
        "data-gif-id"
    );
}, true);