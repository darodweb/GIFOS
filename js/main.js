import { api } from './services.js';
import {
    URLTrendings, URLSearchEndpoint, hamburger, menu, gifContainer, searchBtn, searchResults,
    searchTitle, URLAutocompleteEndpoint, liveSearchResultsContainer, searchSuggestionsContainer,
    HEADER, HERO, TRENDING_GIFOS, BORDER_TOP, BORDER_BOTTOM, DARK_MODE_TRIGGER, FOOTER, DAY_MODE_MENU
} from './constants.js';



//Hamburger Menu

hamburger.addEventListener('click', () => {
    menu.classList.toggle('display');
})

//Querying Trending Gifs and paint to DOM


let gifs = [];

const getTrendingGifs = () => {
    api.getGifs(URLTrendings)
        .then(response => {
            gifs = [];
            for (let i = 0; i < response.data.length; i++) {
                gifs.push(response.data[i].images.fixed_height_downsampled.url);
            }
            insertedGif();
        })
        .catch(error => console.log(error))
}

const gifMarkup = (gif) => {
    return `
    <img src="${gif}"
    class="trending-gifos-gif" alt="gif">
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


// // QUERY THE SEARCH ENDPOINT AND PAINT TO DOM

let searchInputValue = document.querySelector('.hero-search__input');

const gifResultsMarkup = (gifSearchResults) => {
    return `
    <img src="${gifSearchResults}"
    class="trending-gifos-gif" alt="gif">
    `
}

let gifSearchResults = [];

const SearchGifs = () => {
    let URLSearchQuery = URLSearchEndpoint.concat(searchInputValue.value);
    api.getGifs(URLSearchQuery)
        .then(response => {
            gifSearchResults = [];
            for (let i = 0; i < response.data.length; i++) {
                gifSearchResults.push(response.data[i].images.fixed_height_downsampled.url);
            }
            insertedGifSearchResults();
        })
        .catch(error => console.log(error))
}

const searchHandler = () => {
    SearchGifs();
    searchTitle.textContent = searchInputValue.value;
    searchInputValue.value = "";
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
            <a href="${URLSearchEndpoint}${matches}" target="_blank"><p><i class="fa fa-search live-search-icon"></i>${matches}</p></a>
        `)
            .join('');
        liveSearchResultsContainer.innerHTML = htmlLiveSearch;
    }

}

//Live search event listener on search input
searchInputValue.addEventListener('input', () => {
    searchGiphy(searchInputValue.value);
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
}


//Event listerner to trigger dark mode

DARK_MODE_TRIGGER.addEventListener('click', () => {
    toogleIds();
})
DAY_MODE_MENU.addEventListener('click', () => {
    toogleIds();
})

