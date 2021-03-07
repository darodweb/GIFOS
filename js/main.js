import api_trending from './services.js';

const URL = `https://api.giphy.com/v1/gifs/trending?api_key=vr7eliKrqbn1J94gIPNQhs9Gx7ZUM15l&limit=3`

//Hamburger Menu

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('display');
})

//Adding GIFs to markup

const gifContainer = document.querySelector('.trending-gifos-gif');

let gifs = [];

const getTrendingGifs = () => {
    api_trending.getGifs(URL)
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


