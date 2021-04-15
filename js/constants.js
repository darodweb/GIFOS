
const URLTrendings = `https://api.giphy.com/v1/gifs/trending?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&limit=12`;
const URL_TRENDING_SEARCH_TERMS = `https://api.giphy.com/v1/trending/searches?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l`
const URL_SEARCH_BY_ID = `https://api.giphy.com/v1/gifs?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&ids=`;
const UPLOAD_URL = `https://upload.giphy.com/v1/gifs?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l`


const GIF_ID_URL = `https://api.giphy.com/v1/gifs/`;
const LABEL_API_KEY = `api_key`;
const API_KEY = `vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l`;



//Trending GIFs constants
const GIF_SLIDER_CONTAINER = document.querySelector('.trending-gifos-slider-container');
const TRENDING_GIFS_CONTAINER = document.querySelector('.trending-gifos-gif__container');

//Trending Terms constants
const TRENDING_TERMS_CONTAINER = document.querySelector('.hero__trending-terms-container')

// Search GIFS  constants
const searchBtn = document.querySelector('#hero__search-toggle-icon');
const URLSearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&q=`;
const searchResults = document.querySelector('.search-results');
const searchTitle = document.querySelector('.search-title');
const searchSuggestionsContainer = document.querySelector('#hero-search-live-search');
const SEARCH_RESULTS_CONTAINER = document.querySelector('.search-results-container');
const SEARCH_RESULTS_DIVIDER = document.querySelector('#search-bar__line-divider');

// Autocomplete Endpoint constants
const URLAutocompleteEndpoint = `https://api.giphy.com/v1/gifs/search/tags?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&limit=1&q=`
const liveSearchResultsContainer = document.getElementById('hero-search__automcomplete-box');
const SEARCH_INPUT = document.querySelector('.hero-search__input');
const AUTOCOMPLETE_SEARCH_BOX = document.querySelector('#hero-search__automcomplete-box');
const AUTOCOMPLETE_TERM_SUGGESTION = document.querySelector('.hero-search__autocomplete-suggestion');

const CANCEL_SEARCH_ICON = document.querySelector('#hero__cancel-search-icon');
const SEARCH_TERM_ICON = document.querySelector('#hero__search-icon');
const SEARCH_ICON = document.querySelector('#hero__search-toggle-icon');
const INPUT_LINE_SEPARATOR = document.querySelector('#hero-search__separator');
const HERO_SEARCH_BAR = document.querySelector('.hero-search-bar');
const SHOW_MORE_HOME = document.querySelector('#show-more-home');


const MY_GIFOS_CONTAINER = document.querySelector('.mis-gifos-gif-container');

//Slider elements
const PREV_BUTTON = document.querySelector('.arrow-left');
const NEXT_BUTTON = document.querySelector('.arrow-right');

//Hamburger menu constants
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

//Dark Mode Constants
const BORDER_TOP = document.querySelector('.border-top');
const HEADER = document.querySelector('.header');
const HERO = document.querySelector('.hero');
const TRENDING_GIFOS = document.querySelector('.trending-gifos');
const BORDER_BOTTOM = document.querySelector('.border-bottom');
const DARK_MODE_TRIGGER = document.querySelector('.dark-mode');
const FOOTER = document.querySelector('.footer');
const DAY_MODE_MENU = document.querySelector('.day-mode');

//Other elements
const MODAL = document.querySelector('#modal');

//Create Gif Page constants
const CREATE_GIF_TITLE = document.querySelector('#create-gif-title');
const CREATE_GIF_MESSAGE = document.querySelector('#create-gif-message');
const START_BUTTON = document.querySelector('#start-button');
const STOP_BUTTON = document.querySelector('#stop-button');
const UPLOAD_BUTTON = document.querySelector('#upload-button');
const TIMER = document.querySelector('#timer');
const RECORD_BUTTON = document.querySelector('#record-button');
const RECORD_VIDEO = document.querySelector('#record-video');
const RECORDING_VIDEO_CONTAINER = document.querySelector('#recording-video-container');
const CANVAS_CONTAINER = document.querySelector('#canvas-container');
const STEP_1 = document.querySelector('#step-1');
const STEP_2 = document.querySelector('#step-2');
const REPEAT_CAPTION = document.querySelector('#repeat-caption');
const RESET_BUTTON = document.querySelector('#reset-button');

//FAVORITES constants
const FAVORITES_CONTAINER = document.querySelector('.favorites-container');
const FAVORITE_GIFS_CONTAINER = document.querySelector('.favorites-gif__container');




export {
    URLTrendings, hamburger, menu, GIF_SLIDER_CONTAINER, searchBtn, searchResults,
    URLSearchEndpoint, searchTitle, URLAutocompleteEndpoint, liveSearchResultsContainer,
    searchSuggestionsContainer, HEADER, HERO, TRENDING_GIFOS, BORDER_TOP, BORDER_BOTTOM,
    DARK_MODE_TRIGGER, FOOTER, DAY_MODE_MENU, SEARCH_INPUT, AUTOCOMPLETE_SEARCH_BOX,
    SEARCH_RESULTS_DIVIDER, CANCEL_SEARCH_ICON, SEARCH_TERM_ICON, SEARCH_ICON,
    INPUT_LINE_SEPARATOR, HERO_SEARCH_BAR, AUTOCOMPLETE_TERM_SUGGESTION, URL_TRENDING_SEARCH_TERMS,
    TRENDING_TERMS_CONTAINER, SHOW_MORE_HOME, PREV_BUTTON, NEXT_BUTTON, SEARCH_RESULTS_CONTAINER, MODAL,
    FAVORITES_CONTAINER, URL_SEARCH_BY_ID, MY_GIFOS_CONTAINER, TRENDING_GIFS_CONTAINER,
    CREATE_GIF_TITLE, CREATE_GIF_MESSAGE, START_BUTTON, RECORD_BUTTON, RECORD_VIDEO, CANVAS_CONTAINER,
    STEP_1, STEP_2, STOP_BUTTON, UPLOAD_BUTTON, TIMER, REPEAT_CAPTION, UPLOAD_URL,
    RESET_BUTTON, RECORDING_VIDEO_CONTAINER, GIF_ID_URL, LABEL_API_KEY, API_KEY
};