const api_key = "yKPoC4Po1v7SBddIyAJ0kvy9WuyFylrQ"

//TODO:hookup search box to site using "onchange" event listener


document.getElementById("searchInput").onchange = function () {
    myFunction()
};

function myFunction() {
    var keyword = document.getElementById("searchInput").value;
    fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${api_key}&limit=9`).then(response => {
        return response.json();

    }).then(data => {
        console.log(data.data)
        const images = data.data
        addImagesToResponses(images)
    })

}



const addImagesToResponses = (images) => {
    const responses = document.getElementsByClassName('responses')[0]
    //clear out current responses before loading new images
    responses.innerHTML = ""

    for (const image of images) {
        responses.insertAdjacentHTML('beforeend', `<li><img src="${image.images.fixed_width.url}"></li>`)
    }
}





//TODO: Find a way to add an event listener to each tag link
//something something add event listener to array



const theParent = document.getElementsByClassName('tags')

function doSomething(e) {
    if (e.target !== e.currentTarget) {
        e.preventDefault()
        const tag = e.target.dataset.tag;
        //console.log(e.target.dataset.tag)
        fetch(`http://api.giphy.com/v1/gifs/search?q=${tag}&api_key=${api_key}&limit=9`).then(response => {
            return response.json();

        }).then(data => {
            console.log(data.data)
            const images = data.data
            addImagesToResponses(images)
        })

    }
    e.stopPropagation();
}

for (var i = 0; i < theParent.length; i++) {
    theParent[i].addEventListener('click', doSomething, false);
}



// const testTag = document.getElementById('testTag')
// testTag.addEventListener('click', e => {
//     e.preventDefault()
//     const tag = e.target.dataset.tag
//     //console.log(e.target.dataset.tag)
//     fetch(`http://api.giphy.com/v1/gifs/search?q=${tag}&api_key=${api_key}&limit=9`).then(response => {
//         return response.json();

//     }).then(data => {
//         console.log(data.data)
//         const images = data.data
//         addImagesToResponses(images)
//     })
// })

fetch(`http://api.giphy.com/v1/gifs/random?api_key=${api_key}`).then(response => {
    return response.json();

}).then(data => {
    console.log(data.data.images.original.url)
    const url = data.data.images.original.url
    const largeImage = document.getElementsByClassName('large-image')[0]
    largeImage.insertAdjacentHTML('beforeend', `<img src="${url}">`)
})

fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=9`).then(response => {
    return response.json();

}).then(data => {
    console.log(data.data)
    const images = data.data
    addImagesToResponses(images)

})