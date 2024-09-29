let pageNumber = "2";
let searchWord = "relax";

const API_KEY = "1FdYHCM9eipd8iknsngmGyQ3568Wkzk-Htq3-quydjs";
const URL_API = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=${pageNumber}&query=${searchWord}`;

async function getData() {
    const res = await fetch(URL_API);
    const data = await res.json();
    console.log(data);
    console.log(data.results)
    console.log(data.results[0].urls.regular)
    showData(data);
}

getData();

function showData(data) {
    const allCardsWrap = document.querySelector('wrapper-main');
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

