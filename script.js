// API_KEy
// https://api.giphy.com/v1/gifs/search?api_key=SbwrnGqBbHSNIRmqVhPBCILWXxrqzUyj&q=ryan+gosling&limit=12
// https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWttZXc3enI4bGlueWFxN2djd3MzNWZ6eG4zZGhqYmludWRjeXpneCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LYOkCQc638NCaROTNy/giphy.gif"

searchBTN = document.querySelector('.search')
inpTAG = document.querySelector('.inpSearch')
row1 = document.querySelector('.row1')


function generateGifHTML(result){
console.log(result)

result.data.forEach(function(onebyone){
    html = '';
    html += `
<div class ="col1">
    <img src="${onebyone.images.original.url}" width='250' height='190'>
    <a href="${onebyone.images.original.url}" download>Download Gif</a>
    </div>
    `


console.log(html)

    // console.log(onebyone.images.original.url);
    // console.log(onebyone.images.original.size);
    // 
    row1.innerHTML += html;
});


}
searchBTN.addEventListener('click',function () {
url = `https://api.giphy.com/v1/gifs/search?q=${inpTAG.value}&api_key=SbwrnGqBbHSNIRmqVhPBCILWXxrqzUyj&limit=12`
fetch(url).then(function(response){
    return response.json();
}) .then(function(data){
    fetchedData = data;
    generateGifHTML(fetchedData)
    return data;
}) .catch(function(error) {
      console.log('Error:', error)
});
})