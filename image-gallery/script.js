let pageNumber = randomPage(50);
let searchWord = "relax";

const API_KEY = "1FdYHCM9eipd8iknsngmGyQ3568Wkzk-Htq3-quydjs";

const allCardsWrap = document.querySelector('.wrapper-main');
const inputSearch = document.querySelector('.header-search input');
const btnSearch = document.querySelector('.header-search button');

inputSearch.focus();

function getUrl(key, page, search) {
    return `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=${pageNumber}&query=${searchWord}`;
}

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    let lastPage = data.total_pages;
    pageNumber = randomPage(lastPage);
    showData(data);
}

getData(getUrl(API_KEY, pageNumber, searchWord));

function showData(data) {
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

inputSearch.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        searchWord = e.target.value;
        getData(getUrl(API_KEY, pageNumber, searchWord));
    }
});

btnSearch.addEventListener('click', () => {
    if(inputSearch.value) {
        searchWord = inputSearch.value;
        getData(getUrl(API_KEY, pageNumber, searchWord));
    }
})

function randomPage(max) {
    return Math.floor(Math.random() * max);
}