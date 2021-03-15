
const URLTrendings = `https://api.giphy.com/v1/gifs/trending?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&limit=3`;



//Trending GIFs constants
const gifContainer = document.querySelector('.trending-gifos-gif');

// Search GIFS  constants
const searchBtn = document.querySelector('#hero__search');
const URLSearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&q=`;
const searchResults = document.querySelector('.search-results');
const searchTitle = document.querySelector('.search-title');
const searchSuggestionsContainer = document.querySelector('#hero-search-live-search');

// Autocomplete Endpoint constants
const URLAutocompleteEndpoint = `https://api.giphy.com/v1/gifs/search/tags?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&limit=1&q=`
const liveSearchResultsContainer = document.getElementById('hero-search-live-search');

//Hamburger menu constants
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

//Dark Mode Constants
const BORDER_TOP = document.querySelector('.border-top');
const HEADER = document.querySelector('.header');
const HERO = document.querySelector('.hero');
const TRENDING_GIFOS = document.querySelector('.trending-gifos');
const BORDER_BOTTOM = document.querySelector('.border-bottom');
const DARK_MODE_TRIGGER = document.querySelector('#dark-mode');
const FOOTER = document.querySelector('.footer');
const DAY_MODE_MENU = document.querySelector('#day-mode');


export {
    URLTrendings, hamburger, menu, gifContainer, searchBtn, searchResults,
    URLSearchEndpoint, searchTitle, URLAutocompleteEndpoint, liveSearchResultsContainer,
    searchSuggestionsContainer, HEADER, HERO, TRENDING_GIFOS, BORDER_TOP, BORDER_BOTTOM,
    DARK_MODE_TRIGGER, FOOTER, DAY_MODE_MENU
};