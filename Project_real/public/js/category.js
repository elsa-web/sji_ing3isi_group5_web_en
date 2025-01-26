let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');
const popup = document.querySelector('.popup');
const message = document.getElementById('popup-message');
const hostbtn = document.getElementById('host-btn');
const joinbtn = document.getElementById('join-btn');
const continuebtn = document.getElementById('continue-btn');

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
    //CHANGE SLIDER ON ONE CLICK
    thumbnail.addEventListener('click', (e) => {
        e.preventDefault();
        itemActive = index;
        showSlider();
    });

    //SHOW POPUP ON CLICKING CONTINUE
    continuebtn.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000/';
    });

    //SHOW POPUP ON DOUBLE CLICK
    thumbnail.addEventListener('dblclick', (e) => {
        window.location.href = 'http://localhost:3000/';

    });
})



//////////////////////////////////////////////////////////////////////////////////
//Stores locally the category chosen
var category =null;
document.getElementById('geography').addEventListener('dblclick', function () {
    category = "geography";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById('music').addEventListener('dblclick', function () {
    category = "music";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById('football').addEventListener('dblclick', function () {
    category = "football";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById("computer").addEventListener('dblclick', function () {
    category = "computer";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById("history").addEventListener('dblclick', function () {
    category = "history";
    localStorage.setItem("category", category);
    console.log(category);
});
document.getElementById("economy").addEventListener('dblclick', function () {
    category = "economy";
    localStorage.setItem("category", category);
    console.log(category);
});

