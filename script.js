
// These lines select elements from your HTML document (the search button, the input field for searches,
// and the container where GIFs will be displayed) and assign them to variables for easy access.
searchBTN = document.querySelector('.search')
inpTAG = document.querySelector('.inpSearch')
row1 = document.querySelector('.row1')

let loadCountImage = 1; // Initializes a counter to keep track of the number of images loaded.

// Listen for 'Enter' key press on the inpTAG (search input)
inpTAG.addEventListener('keypress', function (event) {
    if (event.key === "Enter") { // Check if the key pressed is the Enter key
        event.preventDefault(); // Prevent the default form submission (if applicable)
        searchBTN.click(); // Programmatically click the search button to trigger the search
    }
});

function generateGifHTML(result) { //iterates over the result.data array, 
    // creating a block of HTML for each GIF. 
    // This includes an <img> element for the GIF itself and a download link with the file size. 
    // It then appends this HTML to row1. 
    // A counter (loadCountImage) is used to track the number of GIFs processed, 
    //and a loader animation is hidden after 24 GIFs are loaded.
    loadCountImage = 1
    result.data.forEach(function (onebyone) {
        loadCountImage++
        html = '';
        html += `
<div class ="col1">
    <img src="${onebyone.images.original.url}" width='250' height='190'>
 
    <a href="${onebyone.images.original.url}" class="" download>Download<span>${((onebyone.images.original.size / 8) / (1024 * 1024)).toFixed(4)}(MB)</span>  </a>
    </div>
    `

        row1.innerHTML += html;
        if (loadCountImage === 24) {
            console.log(loadCountImage)
            hideLoader()
        }
    });

    allImages = document.querySelectorAll('.row1 img')




}


searchBTN.addEventListener('click', function () {
    url = `https://api.giphy.com/v1/gifs/search?q=${inpTAG.value}&api_key=${YOUR_API_KEY}&limit=24`
    fetch(url).then(function (response) { //Constructs the URL for the Giphy API request using the value 
        // entered in the search input. 
        // It fetches data from the API, then uses setTimeout to delay the display slightly 
        // (to show a loading animation). 
        // Once the data is fetched, it calls generateGifHTML to process and display the GIFs.
        return response.json();
    }).then(function (data) {
        fetchedData = data;
        showLoader()
        setTimeout(() => {
            generateGifHTML(fetchedData)

        }, 500);

        return data;
    }).catch(function (error) {
        console.log('Error:', error);
    });
})

function showLoader() {
    document.querySelector('.loader').classList.remove('loaded')
}

function hideLoader() {
    document.querySelector('.loader').classList.add('loaded')
}// These functions add or remove a class (loaded) that controls the display of the loading animation. 
// This provides visual feedback to the user that the search is being processed.