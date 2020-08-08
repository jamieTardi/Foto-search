//declared variables and consts

const apiCode = '563492ad6f9170000100000117983894eedb4a8e84c37233fd388cfa';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const results = document.querySelector('.search-results')
const more = document.querySelector('.more')
const searchResult = document.querySelector('.search-result')
const header = document.querySelector('.header-div')

let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//event listeners

searchInput.addEventListener('input', updateInput)

// window.onload = function () {
//     toggle.classList.
// }

more.addEventListener('click', loadMore)

form.addEventListener('submit', e => {
    e.preventDefault()
    
    currentSearch = searchValue
    searchPhotos(searchValue)
    
})



function updateInput(e) {
    searchValue = e.target.value
    
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: apiCode,
        }
    });
    const data = await dataFetch.json();
    return data
}


async function generatePictures(data){
    await data.photos.forEach(photo => {
         console.log(photo)
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-info"> 
        <p> Author: </br>${photo.photographer} </p>
        <a href=${photo.src.original} target="_blank">Full Size </a>
        <a href=${photo.src.tiny} target="_blank">Thumbnail </a>
        </div>
        <img src=${photo.src.large} />
        `
        gallery.appendChild(galleryImg)

        if (searchValue === undefined){
            searchResult.innerHTML = ``
        } else {
            searchResult.innerHTML = `
            <p>You searched for ${searchValue}.</p>`
        }
    });
}


// Grab Photo, and additional info
async function curatedPhotos() {
    //Must use async to allow us yo use await.
let fetchLink = 'https://api.pexels.com/v1/curated'
    const data = await fetchApi(
      fetchLink  
    );
generatePictures(data)
}

curatedPhotos()
async function searchPhotos(query) {
    clear()
    let fetchLink = `https://api.pexels.com/v1/search?query=${query}+query`
    const data = await fetchApi(fetchLink)
    
    generatePictures(data)

}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
  }
 
async function loadMore () {
page++;
if (currentSearch){
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`

}
else {
    
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
}
const data = await fetchApi(fetchLink)
generatePictures(data);
}