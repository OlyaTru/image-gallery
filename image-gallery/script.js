let pageNumber = 1;
let searchWord = "relax";

const API_KEY = "1FdYHCM9eipd8iknsngmGyQ3568Wkzk-Htq3-quydjs";

const allCardsWrap = document.querySelector('.wrapper-main');
const inputSearch = document.querySelector('.header-search input');
const btnSearch = document.querySelector('.header-search button');

const pageCountCache = new Map();

inputSearch.focus();
getData(searchWord);

function getUrl(page, search) {
    return `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=${page}&query=${search}`;
}

async function getData(text) {
    let maxPage = pageCountCache.get(text) ?? 1;
    let page = randomPage(maxPage);
    let url = getUrl(page, text);

    const res = await fetch(url);
    if (res.status !== 200) {
        alert(`Cannot retrieve data from server. Status: ${res.status}`);
        return;
    }

    const data = await res.json();
    pageCountCache.set(text, data.total_pages);

    showData(data);
}

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
        getData(searchWord);
    }
});

btnSearch.addEventListener('click', () => {
    if(inputSearch.value) {
        searchWord = inputSearch.value;
        getData(searchWord);
    }
});

function randomPage(max) {
    max = max > 30 ? 30 : max;
    let random = Math.ceil(Math.random() * max);
    return random !== 0 ? random : 1;
}