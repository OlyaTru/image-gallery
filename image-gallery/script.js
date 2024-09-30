let pageNumber = randomPage(50);
let searchWord = "relax";

const API_KEY = "1FdYHCM9eipd8iknsngmGyQ3568Wkzk-Htq3-quydjs";
const URL_API = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=${pageNumber}&query=${searchWord}`;

const allCardsWrap = document.querySelector('.wrapper-main');
const inputSearch = document.querySelector('.header-search input');
const btnSearch = document.querySelector('.header-search button');

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();

    showData(data);
}

getData(URL_API);

function showData(data) {
    /*let lastPage = data.total_pages;
    pageNumber = randomPage(lastPage);*/

    allCardsWrap.innerHTML = '';

    const images = document.createElement("ul");
    images.classList.add("main-images");
    allCardsWrap.appendChild(images);

    data.results.forEach(img => {
        const itemLi = document.createElement("li");
        itemLi.classList.add("card");
        itemLi.innerHTML = `<img src="${img.urls.regular}" alt="image">`;
        images.appendChild(itemLi);
    });
}

/*inputSearch.addEventListener('change', (e) => {

    if(inputSearch.value) {
        searchWord = inputSearch.value;
        getData(URL_API);
    }
console.log(searchWord)
})*/

/*btnSearch.addEventListener('click', () => {
    console.log('click')
})*/

function randomPage(max) {
    return Math.floor(Math.random() * max);
}