const accessKey = "bGB7o1-H0RLkl5GWr4rQFYRU-tj45CppdQaLL8jk15k";
const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-app");
const searchResults = document.querySelector(".search-results");

let inputData ="";
let page = 1; 

async function searchImages(){
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=$
    {inputData}&client_id${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page ===1){
         searchResults.innerHTML = "";
    }

    results.map((results) =>{
        const imageWrap = document.createElement("div");
        imageWrap.classList.add("searchresult");
        const image = document.createElement("img");
        image.src = results.url.small;
        const imageLink = document.createElement("a");
        imageLink.href = results.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = results.alt_descrption;


        imageWrap.appendChild(image);
        imageWrap.appendChild(imageLink);
        searchResults.appendChild(imageWrap);
    });

}
page++;

formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    page =1;
    searchImages();
})

