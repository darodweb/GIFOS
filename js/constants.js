
const URLTrendings = `https://api.giphy.com/v1/gifs/trending?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&limit=3`;



//Trending GIFs constants
const gifContainer = document.querySelector('.trending-gifos-gif');

// Search GIFS  constants
const searchBtn = document.querySelector('#hero__search');
const URLSearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&q=`;
const searchResults = document.querySelector('.search-results');
const searchTitle = document.querySelector('.search-title');

// Autocomplete Endpoint constants
const URLAutocompleteEndpoint = `https://api.giphy.com/v1/gifs/search/tags?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&q=`

//Hamburger menu constants
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');


export { URLTrendings, hamburger, menu, gifContainer, searchBtn, searchResults, URLSearchEndpoint, searchTitle, URLAutocompleteEndpoint };