
searchBTN = document.querySelector('.search')
inpTAG = document.querySelector('.inpSearch')
row1 = document.querySelector('.row1')
let loadCountImage = 1
function generateGifHTML(result) {

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
        if (loadCountImage === 12) {
            console.log(loadCountImage)
            hideLoader()
        }
    });

    allImages = document.querySelectorAll('.row1 img')




}


searchBTN.addEventListener('click', function () {
    url = `https://api.giphy.com/v1/gifs/search?q=${inpTAG.value}&api_key=SbwrnGqBbHSNIRmqVhPBCILWXxrqzUyj&limit=12`
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        fetchedData = data;
        showLoader()
        setTimeout(() => {
            generateGifHTML(fetchedData)

        }, 1000);

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
}
