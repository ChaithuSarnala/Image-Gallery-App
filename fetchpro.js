
const accessKey = "aeY4zBjQHWm9u4_6ul9H2Q-561Y-wMkR8cM9x68hL1A";
const formElement =document.querySelector("form");
const inputElement = document.getElementById("search_input");
const searchResults = document.querySelector(".search_results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch (url);
    const data = await response.json();

    const results = data.results;

    if (page === 1){
        searchResults.innerHTML = "";

    }
    results.map((result)=>{
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("search_result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLinks = document.createElement("a");
        imageLinks.href = result.links.html;
        imageLinks.target = "_blank";
        imageLinks.textContent = result.alt_description;

        imageContainer.appendChild(image)
        imageContainer.appendChild(imageLinks)
        searchResults.appendChild(imageContainer)



    });
    page++
    if(page > 1){
        showMore.style.display = "block"
    }

}
formElement.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages();

});
showMore.addEventListener("click", ()=>{
    searchImages();

});
