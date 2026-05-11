const searchInputEle = document.getElementById("searchInput");
const searchResultsEle = document.getElementById("searchResults");
const spinnerEle = document.getElementById("spinner");

function createAndAppendResult(result) {
    const { link, title, description } = result;

    let resultItemEle = document.createElement("div");
    resultItemEle.classList.add("result-item");

    let resultTitleEle = document.createElement("a");
    resultTitleEle.classList.add("result-title");
    resultTitleEle.textContent = title;
    resultTitleEle.href = link;
    resultTitleEle.target = "_blank";
    resultItemEle.appendChild(resultTitleEle);

    let urlEle = document.createElement("a");
    urlEle.href = link;
    urlEle.classList.add("result-url");
    urlEle.textContent = link;
    urlEle.target = "_blank";
    resultItemEle.appendChild(urlEle);

    let descriptionEle = document.createElement("p");
    descriptionEle.classList.add("link-description");
    descriptionEle.textContent = description;
    resultItemEle.appendChild(descriptionEle);

    searchResultsEle.appendChild(resultItemEle);
}

function displayResults(searchResults) {
    spinnerEle.classList.add("d-none");
    if (searchResults.length === 0) {
        searchResultsEle.innerHTML = "<p class='text-center'>No results found.</p>";
        return;
    }
    for (let result of searchResults) {
        createAndAppendResult(result);
    }
}

async function wikipediaSearch(event) {
    if (event.key === "Enter") {
        const query = searchInputEle.value.trim();
        if (!query) return;

        searchResultsEle.textContent = "";
        spinnerEle.classList.remove("d-none");

        const url = `https://apis.ccbp.in/wiki-search?search=${query}`;
        
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            displayResults(jsonData.search_results);
        } catch (error) {
            spinnerEle.classList.add("d-none");
            console.error("Fetch error:", error);
        }
    }
}

searchInputEle.addEventListener("keydown", wikipediaSearch);
