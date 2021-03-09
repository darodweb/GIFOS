import { api } from './services.js';
import { URLTrendings, URLSearchEndpoint, hamburger, menu, gifContainer, searchBtn, searchResults, searchTitle } from './constants.js';



//Hamburger Menu

hamburger.addEventListener('click', () => {
    menu.classList.toggle('display');
})

//Querying Trending Gifs and adding to DOM


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


// QUERY THE SEARCH ENDPOINT AND PAINTING TO DOM

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