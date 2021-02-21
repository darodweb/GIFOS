const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('display');
})

//Night Mode toggle

const header = document.getElementById("header");
const hero = document.getElementById("hero");
const trendingGifos = document.getElementById("trending-gifos");
const footer = document.getElementById("footer");
const modoNocturno = document.getElementById("modo-nocturno");

const p = document.getElementsByTagName('p');
const h1 = document.getElementsByTagName('h1');

console.log(trendingGifos);

const pToWhite = () => {
    for (i = 0; i < p.length; i++) {
        p[i].classList.toggle('textToWhite');
    }
}
const h1ToWhite = () => {
    for (i = 0; i < h1.length; i++) {
        h1[i].classList.toggle('textToWhite');
    }
}


const addDarkMode = () => {
    console.log(trendingGifos);
}

modoNocturno.addEventListener('click', () => {
    addDarkMode();
    pToWhite();
    h1ToWhite();

})