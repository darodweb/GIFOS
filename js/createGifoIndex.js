import {
    URLTrendings, hamburger, menu, TRENDING_GIFS_CONTAINER, searchBtn, searchResults,
    searchTitle, HEADER, HERO, TRENDING_GIFOS, BORDER_TOP, BORDER_BOTTOM, DARK_MODE_TRIGGER, FOOTER, DAY_MODE_MENU,
    SEARCH_RESULTS_DIVIDER, SHOW_MORE_HOME, PREV_BUTTON, NEXT_BUTTON, SEARCH_RESULTS_CONTAINER, MODAL,
    FAVORITES_CONTAINER, URL_SEARCH_BY_ID, CREATE_GIF_TITLE, CREATE_GIF_MESSAGE, START_BUTTON,
    RECORD_BUTTON, RECORD_VIDEO, CANVAS_CONTAINER, STEP_1, STEP_2, STEP_3, STOP_BUTTON, UPLOAD_BUTTON,
    TIMER, REPEAT_CAPTION, UPLOAD_URL, RESET_BUTTON, RECORDING_VIDEO_CONTAINER, GIF_ID_URL,
    LABEL_API_KEY, API_KEY, UPLOAD_OVERLAY, UPLOAD_LOADER, UPLOAD_OK, UPLOAD_MESSAGE, GIF_BY_ID_URL
} from './constants.js';
import { recordRTC } from './recordRTC.js'



START_BUTTON.addEventListener("click", (event) => {
    recordRTC.start(
        event,
        CREATE_GIF_TITLE,
        CREATE_GIF_MESSAGE,
        START_BUTTON,
        RECORD_BUTTON,
        RECORD_VIDEO,
        CANVAS_CONTAINER,
        STEP_1,
        STEP_2);
}, false);


RECORD_BUTTON.addEventListener("click", () => {
    recordRTC.record(
        RECORD_BUTTON,
        STOP_BUTTON,
        TIMER
    );
}, false);


REPEAT_CAPTION.addEventListener("click", () => {
    recordRTC.repeatCaption(
        CANVAS_CONTAINER,
        REPEAT_CAPTION,
        UPLOAD_BUTTON,
        RECORD_BUTTON,
        TIMER
    );
}, false);

STOP_BUTTON.addEventListener("click", () => {
    recordRTC.stop(
        CANVAS_CONTAINER,
        RECORDING_VIDEO_CONTAINER,
        STOP_BUTTON,
        UPLOAD_BUTTON,
        TIMER,
        REPEAT_CAPTION
    );
}, false);


UPLOAD_BUTTON.addEventListener("click", () => {
    recordRTC.upload(
        UPLOAD_OVERLAY,
        UPLOAD_LOADER,
        UPLOAD_OK,
        UPLOAD_MESSAGE,
        STEP_2,
        STEP_3,
        UPLOAD_BUTTON,
        RESET_BUTTON,
        REPEAT_CAPTION,
        UPLOAD_URL,
        RECORDING_VIDEO_CONTAINER
    );
}, false);


RESET_BUTTON.addEventListener("click", recordRTC.reset, false);

RECORDING_VIDEO_CONTAINER.addEventListener("click", (event) => {
    recordRTC.download(
        event,
        "icon-download",
        GIF_BY_ID_URL,
        LABEL_API_KEY,
        API_KEY
    );
}, true);


RECORDING_VIDEO_CONTAINER.addEventListener("click", (event) => {
    recordRTC.copyLink(
        event,
        "icon-link",
        GIF_BY_ID_URL,
        LABEL_API_KEY,
        API_KEY
    );
}, true);