let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

var category =null;
document.getElementById('geography').addEventListener('click', function () {
    category = "geography";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById('music').addEventListener('click', function () {
    category = "music";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById('football').addEventListener('click', function () {
    category = "football";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById("computer").addEventListener('click', function () {
    category = "computer";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById("history").addEventListener('click', function () {
    category = "history";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById("economy").addEventListener('click', function () {
    category = "economy";
    localStorage.setItem("category", category);
    console.log(category);
});

console.log(category);
// export {category};