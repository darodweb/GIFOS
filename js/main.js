import { api } from './services.js';
import { gif } from './gif.js';
import {
    URLTrendings, URLSearchEndpoint, hamburger, menu, GIF_SLIDER_CONTAINER, searchBtn, searchResults,
    searchTitle, URLAutocompleteEndpoint, liveSearchResultsContainer, searchSuggestionsContainer,
    HEADER, HERO, TRENDING_GIFOS, BORDER_TOP, BORDER_BOTTOM, DARK_MODE_TRIGGER, FOOTER, DAY_MODE_MENU,
    SEARCH_INPUT, AUTOCOMPLETE_SEARCH_BOX, SEARCH_RESULTS_DIVIDER, CANCEL_SEARCH_ICON, SEARCH_TERM_ICON,
    SEARCH_ICON, INPUT_LINE_SEPARATOR, HERO_SEARCH_BAR, AUTOCOMPLETE_TERM_SUGGESTION, URL_TRENDING_SEARCH_TERMS,
    TRENDING_TERMS_CONTAINER, SHOW_MORE_HOME, PREV_BUTTON, NEXT_BUTTON, SEARCH_RESULTS_CONTAINER, MODAL,
    FAVORITES_CONTAINER, TRENDING_GIFS_CONTAINER
} from './constants.js';



//Hamburger Menu

hamburger.addEventListener('click', () => {
    menu.classList.toggle('display');
})

//QUERY TRENDING Gifs AND RENDER TO DOM

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
    GIF_SLIDER_CONTAINER.innerHTML = gifCards;

}

getTrendingGifs();


//QUERY TRENDING TERMS ENDPOINT AND RENDER TO DOM

let trendingTerms = [];

const getTrendingTerms = () => {
    api.getGifs(URL_TRENDING_SEARCH_TERMS)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                trendingTerms.push(response.data[i]);
            }
            insertedTrendingTerms();
        })
        .catch(error => console.log(error))

}

const trendingTermsMarkup = (terms) => {
    return `
    <span class="hero__trending-terms">${terms}</span><span>,</span>
    `
}

const insertedTrendingTerms = () => {
    let trendingTermsItems = "";
    let finalTrendingTerms = trendingTerms.splice(1, 5);
    for (let i = 0; i < finalTrendingTerms.length; i++) {
        trendingTermsItems += trendingTermsMarkup(trendingTerms[i]);
    }
    TRENDING_TERMS_CONTAINER.innerHTML = trendingTermsItems;
}


getTrendingTerms();


// Function to make trending search terms clickable and fill in the input upon click (Part of Query Trending Terms section)

function addEventListenerToSearchTerms(event, inputElement, class_Name) {
    if (event.target.className === class_Name) {
        inputElement.value = event.target.textContent;
        let SavedSearchTerm = event.target.textContent;
        localStorage.setItem('searchTerm', `${SavedSearchTerm}`);
    }
}

TRENDING_TERMS_CONTAINER.addEventListener('click', (event) => {
    addEventListenerToSearchTerms(
        event,
        SEARCH_INPUT,
        "hero__trending-terms"
    )
    setTimeout(() => {
        searchBtn.click();
    }, 600);

})
//------END OF QUERY TRENDING TERMS ENDPOINT AND RENDER TO DOM


//  QUERY THE SEARCH ENDPOINT AND RENDER TO DOM

let searchInputValue = document.querySelector('.hero-search__input');

const gifResultsMarkup = (gifSearchResults) => {
    SHOW_MORE_HOME.style.display = "block";

    return `
    <div class="search-results__gif-container">
        <img src="${gifSearchResults.images.fixed_height_downsampled.url}"
        class="search-results__gif" alt="${gifSearchResults.title}">
        <div className="search-results-overlay" id="search-results-overlay"></div>
        <div class="icon-container">
            <i class="icon-fav-false" data-fav-id=${gifSearchResults.id} title="Favorito"></i>
            <i class="icon-download" data-download-url=${gifSearchResults.url}
                data-download-title=${gifSearchResults.title}
                title="Descargar"></i>
            <i class="icon-expand" data-expand-url=${gifSearchResults.images.fixed_height.url}
            data-expand-username=${gifSearchResults.username} data-expand-title=${gifSearchResults.title}
            data-expand-id=${gifSearchResults.id}
            title="Expandir"></i>
        </div>
        <p class="gif-user">${gifSearchResults.username}</p>
        <p class="gif-title">${gifSearchResults.title}</p>
    </div>
    `

}

let gifSearchResults = [];

const SearchGifs = () => {
    let limitToDisplay = 12;
    let URLSearchQuery = `${URLSearchEndpoint}${searchInputValue.value}&limit=${limitToDisplay}`

    api.getGifs(URLSearchQuery)
        .then(response => {
            gifSearchResults = [];
            for (let i = 0; i < response.data.length; i++) {
                gifSearchResults.push(response.data[i]);
            }
            insertedGifSearchResults();
        })
        .catch(error => console.log(error))
}

//----Function to load more gifs upon clicking the "Ver Mas" button.
let offset = "";
const LoadMoreGifs = () => {
    let SearchWordToKeepLoading = localStorage.getItem('searchTerm');
    offset = Number(offset + 12);
    let limitToDisplay = 12;
    let URL_LOAD_MORE = `${URLSearchEndpoint}${SearchWordToKeepLoading}&limit=${limitToDisplay}&offset=${offset}`

    api.getGifs(URL_LOAD_MORE)
        .then(response => {
            gifSearchResults = gifSearchResults;
            for (let i = 0; i < response.data.length; i++) {
                gifSearchResults.push(response.data[i]);
            }
            insertedGifSearchResults();
        })
        .catch(error => console.log(error))

}

function showMoreHomePage() {
    if (gifSearchResults.length > 0 && gifSearchResults.length <= 48) {
        LoadMoreGifs();
        insertedGifSearchResults();

    } else { SHOW_MORE_HOME.classList.add('disabled') }
}

SHOW_MORE_HOME.addEventListener('click', () => {
    showMoreHomePage();
});
//-------END of Function to load more gifs upon clicking the "Ver Mas" button.

const searchHandler = () => {
    SearchGifs();
    searchTitle.textContent = searchInputValue.value;
    searchInputValue.value = "";
    SEARCH_RESULTS_DIVIDER.style.display = "block";
    SEARCH_RESULTS_DIVIDER.style.height = "0.5px";
    SEARCH_RESULTS_DIVIDER.style.backgroundColor = "#9CAFC3";
    SEARCH_RESULTS_DIVIDER.style.width = "338px";
    SEARCH_RESULTS_DIVIDER.style.marginTop = "74px";
    SEARCH_RESULTS_DIVIDER.style.marginBottom = "84px";
    SEARCH_RESULTS_DIVIDER.style.position = "relative";
    SEARCH_RESULTS_DIVIDER.style.left = "50%";
    SEARCH_RESULTS_DIVIDER.style.transform = "translateX(-50%)";
    SEARCH_RESULTS_DIVIDER.style.opacity = "0.5";
    CANCEL_SEARCH_ICON.style.display = "none";
    SEARCH_TERM_ICON.style.display = "none";
    SEARCH_ICON.style.display = "unset";
    INPUT_LINE_SEPARATOR.style.display = "block";
}

const insertedGifSearchResults = () => {
    let gifResultCards = "";
    for (let i = 0; i < gifSearchResults.length; i++) {
        gifResultCards += gifResultsMarkup(gifSearchResults[i]);
    }
    searchResults.innerHTML = gifResultCards;

}

// Search for gifs after hitting Enter
searchInputValue.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        searchBtn.click(() => searchHandler());
        SEARCH_INPUT.value = '';
        wordMatches.length = 0;
        AUTOCOMPLETE_SEARCH_BOX.innerHTML = "";
        CANCEL_SEARCH_ICON.style.display = "none";
        SEARCH_TERM_ICON.style.display = "none";
        SEARCH_ICON.style.display = "unset";
        INPUT_LINE_SEPARATOR.style.display = "unset";
    }
})

// Search for gifs after clicking search button
searchBtn.addEventListener('click', searchHandler);


//Query Giphy's Autocomplete endpoint   

let wordMatches = [];
const searchGiphy = async () => {
    let URLSearchAutocomplete = URLAutocompleteEndpoint.concat(searchInputValue.value);
    const response = await fetch(URLSearchAutocomplete);
    const results = await response.json();
    let wordResults = []
    wordMatches.push(results);
    wordMatches.forEach(match => {
        match.data.forEach(element => {
            wordResults.push(element.name);
        })
    });
    console.log(wordResults)
    searchMatches(wordResults);

}

//Function to show word suggestions in DOM 
const searchMatches = (wordResults) => {
    if (wordMatches.length > 0) {

        const htmlLiveSearch = wordResults.map(matches => `
            <li class="hero-search__autocomplete-suggestion">${matches}</li>
        `)
            .join('');
        liveSearchResultsContainer.innerHTML = htmlLiveSearch;
    }


}

//Live search event listener on search input
searchInputValue.addEventListener('input', () => {

    searchGiphy(searchInputValue.value);
    if (searchInputValue.value !== "") {
        CANCEL_SEARCH_ICON.style.display = "block";
        SEARCH_TERM_ICON.style.display = "block";
        SEARCH_ICON.style.display = "none";
        INPUT_LINE_SEPARATOR.style.display = "block";
    } else {
        CANCEL_SEARCH_ICON.style.display = "none";
        SEARCH_TERM_ICON.style.display = "none";
        SEARCH_ICON.style.display = "unset";
        INPUT_LINE_SEPARATOR.style.display = "none";
    }
})

// Event listener on CANCEL_SEARCH_ICON 
CANCEL_SEARCH_ICON.addEventListener('click', () => {
    SEARCH_INPUT.value = '';
    wordMatches.length = 0;
    AUTOCOMPLETE_SEARCH_BOX.innerHTML = "";
    CANCEL_SEARCH_ICON.style.display = "none";
    SEARCH_TERM_ICON.style.display = "none";
    SEARCH_ICON.style.display = "unset";
    INPUT_LINE_SEPARATOR.style.display = "none";
})


//Dark Mode for HOME page

const toggleBorderIds = () => {
    if (BORDER_TOP.id === "" && BORDER_BOTTOM.id === "") {
        BORDER_TOP.id += "dark-mode-dark-black__top-border"
        BORDER_BOTTOM.id += "dark-mode-dark-black__bottom-border"
    } else {
        BORDER_TOP.removeAttribute('id');
        BORDER_BOTTOM.removeAttribute('id');
    }
}

const toggleHeaderHeroAndFooterId = () => {
    if (HEADER.id === "" && HERO.id === "" && FOOTER.id === "") {
        HEADER.id += "dark-mode-gray__header"
        HERO.id += "dark-mode-gray__hero"
        FOOTER.id += "dark-mode-gray__footer"

    } else {
        HEADER.removeAttribute('id');
        HERO.removeAttribute('id');
        FOOTER.removeAttribute('id');
    }
}

const toggleInputId = () => {
    const AUTOCOMPLETE_TERM_SUGGESTION_LIST_STYLE = document.querySelector('.hero-search__autocomplete-suggestion');
    if (HERO_SEARCH_BAR.id === "") {
        HERO_SEARCH_BAR.id += "hero-search-bar";
        HERO_SEARCH_BAR.style.backgroundColor = '#37383C';
        HERO_SEARCH_BAR.style.border = '1px solid white';
        SEARCH_INPUT.id += "hero-search__input";
        SEARCH_INPUT.style.border = 'none';
        SEARCH_ICON.style.backgroundImage = "url('../../assets/icon-search-modo-noct.svg')";
        SEARCH_ICON.classList.add('hero__search--dark-mode-icon');
        SEARCH_TERM_ICON.style.backgroundImage = "url('../../assets/icon-search-modo-noct.svg')";
        // AUTOCOMPLETE_TERM_SUGGESTION_LIST_STYLE.style.listStyleImage = 'url("../assets/icon-search-modo-noct.svg")';
    } else {
        HERO_SEARCH_BAR.removeAttribute('id');
        HERO_SEARCH_BAR.style.border = '1px solid #572EE5';
        HERO_SEARCH_BAR.style.backgroundColor = 'white';
        SEARCH_INPUT.removeAttribute('id');
        SEARCH_ICON.style.backgroundImage = "url('../../assets/icon-search.svg')"
        SEARCH_ICON.classList.remove('hero__search--dark-mode-icon');
    }
}

const toggleTrendingGifosId = () => {
    if (TRENDING_GIFOS.id === "") {
        TRENDING_GIFOS.id += "dark-mode-dark-gray__trending-gifos"

    } else {
        TRENDING_GIFOS.removeAttribute('id');
    }
}

//Function to change 'Modo Nocturno' text to 'Modo Diurno'
const toogleMenuText = () => {

    if (DARK_MODE_TRIGGER.id === "") {
        DAY_MODE_MENU.removeAttribute('id');
        DARK_MODE_TRIGGER.id += "hidden"
    } else if (DAY_MODE_MENU.id === "") {
        DAY_MODE_MENU.id += 'hidden';
        DARK_MODE_TRIGGER.removeAttribute('id');
    }

}


//Function to toggle classes on DOM sections

const toogleIds = () => {
    toggleBorderIds();
    toggleHeaderHeroAndFooterId();
    toggleTrendingGifosId();
    toogleMenuText();
    toggleInputId();
}


//Event listerner to trigger dark mode

DARK_MODE_TRIGGER.addEventListener('click', () => {
    const HTML = document.querySelector('#html')
    HTML.setAttribute('data-theme', 'true');
    toogleIds();
})
DAY_MODE_MENU.addEventListener('click', () => {
    const HTML = document.querySelector('#html')
    HTML.removeAttribute('data-theme', 'true');
    toogleIds();
})


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
searchResults.addEventListener("click", (event) => {
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

searchResults.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);


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
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);






// FAVORITES_CONTAINER.addEventListener("click", (event) => {
//     gif.favorite(event, "icon-fav-false", "icon-fav-true");
// }, true);

// Add download functionality to the download icon
GIF_SLIDER_CONTAINER.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);

// Add expand functionality to the expand icon - or to the gif itself for mobile






