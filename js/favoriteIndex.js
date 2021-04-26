import { api } from './services.js';
import { gif } from './gif.js';
import {
    URLTrendings, hamburger, menu, searchBtn, searchResults,
    searchTitle, HEADER, HERO, TRENDING_GIFOS, BORDER_TOP, BORDER_BOTTOM, DARK_MODE_TRIGGER, FOOTER, DAY_MODE_MENU,
    SEARCH_RESULTS_DIVIDER, SHOW_MORE_HOME, PREV_BUTTON, NEXT_BUTTON, SEARCH_RESULTS_CONTAINER, MODAL,
    FAVORITES_CONTAINER, URL_SEARCH_BY_ID, GIF_SLIDER_CONTAINER, BODY, DARK_MODE_MENU,
    LOGO_DARK_MODE, LOGO_DARK_LIGHT_MODE, DARK_MODE_DESKTOP_MENU
} from './constants.js';


//Check current theme in localStorage
let _isDarkTheme = localStorage.getItem('isDarkTheme');
// if (_isDarkTheme !== null) {
//     if (_isDarkTheme === 'true') {
//         console.log('si entró en true')
//         BODY.classList.add('dark-mode');
//         DARK_MODE_DESKTOP_MENU.innerHTML = "MODO DIURNO";
//     } else if (_isDarkTheme === 'false') {
//         console.log('si entró en false')
//         BODY.classList.remove('dark-mode');
//         DARK_MODE_DESKTOP_MENU.innerHTML = "MODO NOCTURNO";
//     }
// }

if (_isDarkTheme) {
    BODY.classList.add('dark-mode');

    if (_isDarkTheme === 'true') {
        DARK_MODE_DESKTOP_MENU.innerHTML = "MODO DIURNO";
    } else {
        BODY.classList.remove('dark-mode');
        DARK_MODE_DESKTOP_MENU.innerHTML = "MODO NOCTURNO";
    }
}



//-------DARK MODE TOGGLE ON MOBILE--------------------------
function changeMobileMenuText(event) {
    let _innerText = event.target.textContent;
    if (_innerText === "Modo Nocturno") {
        DARK_MODE_MENU.innerHTML = "Modo Diurno";
        LOGO_DARK_MODE.classList.remove('hidden');
        LOGO_DARK_LIGHT_MODE.classList.add('hidden');
    } else if (_innerText === "Modo Diurno") {
        DARK_MODE_MENU.innerHTML = "Modo Nocturno";
        LOGO_DARK_MODE.classList.add('hidden');
        LOGO_DARK_LIGHT_MODE.classList.remove('hidden');
    }
}

function changeDesktopMenuText(event) {
    let _innerTextDesktop = event.target.textContent;

    if (_innerTextDesktop === "MODO NOCTURNO") {
        DARK_MODE_DESKTOP_MENU.innerHTML = "MODO DIURNO";

    } else {
        DARK_MODE_DESKTOP_MENU.innerHTML = "MODO NOCTURNO";
    }
}

//For desktop
let toggleDarkTheme = _isDarkTheme
DARK_MODE_DESKTOP_MENU.addEventListener('click', (event) => {
    toggleDarkTheme = !toggleDarkTheme
    localStorage.setItem('isDarkTheme', `${toggleDarkTheme}`);
    BODY.classList.toggle('dark-mode');
    changeDesktopMenuText(event);

})


//FOr Mobile
DARK_MODE_TRIGGER.addEventListener('click', (event) => {
    toggleDarkTheme = !toggleDarkTheme
    localStorage.setItem('isDarkTheme', `${toggleDarkTheme}`);
    BODY.classList.toggle('dark-mode');
    changeMobileMenuText(event);
})

DAY_MODE_MENU.addEventListener('click', (event) => {
    _currentTheme = localStorage.setItem('light');
    BODY.classList.toggle('dark-mode');
    changeMobileMenuText(event);

})

//-----------HAMBURGER MENU-----------------------
let burgerCloseButtonState = false;

hamburger.addEventListener('click', () => {
    burgerCloseButtonState = !burgerCloseButtonState

    menu.classList.toggle('display');

    if (burgerCloseButtonState !== false) {
        hamburger.style.backgroundImage = `var(--close-hamburger)`;

    } else if (burgerCloseButtonState === false) {
        hamburger.style.backgroundImage = `var(--hamburger)`;
    }

})

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
            <i class="icon-download" data-download-url=${gif.images.fixed_height_downsampled.url}
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
            <i class="icon-download" data-download-url=${gif.images.fixed_height_downsampled.url}
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
    GIF_SLIDER_CONTAINER.innerHTML = gifCards;

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
    scrollToRight(GIF_SLIDER_CONTAINER);
}, false);

NEXT_BUTTON.addEventListener("click", () => {
    scrollToLeft(GIF_SLIDER_CONTAINER);
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
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);

FAVORITES_CONTAINER.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
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



GIF_SLIDER_CONTAINER.addEventListener("click", (event) => {
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);

// Add download functionality to the download icon
GIF_SLIDER_CONTAINER.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);

// Add expand functionality to the expand icon - or to the gif itself for mobile
GIF_SLIDER_CONTAINER.addEventListener("click", (event) => {
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

GIF_SLIDER_CONTAINER.addEventListener("click", (event) => {
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