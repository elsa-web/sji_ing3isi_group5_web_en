let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');
let win = document.getElementById("win");
let lose = document.getElementById("lose");

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

//getting username and displaying
const currentUsermail=localStorage.getItem("currentUser");
console.log("mail:"+ currentUsermail)
const currentUser=JSON.parse(localStorage.getItem(currentUsermail));
console.log("user:"+ currentUser)
const currentusername = currentUser.name;
document.getElementById("usrname").textContent=currentusername;
win.textContent=currentUser.win;
lose.textContent=currentUser.lose;

const overlay=document.getElementById("overlay");
const showOverlayButton=document.getElementById("showOverlay");
const tablesContainer =document.getElementById("tables-container");
const cate=["geography", "computer", "music", "history", "economy", "football"];


//to show leaderboard
showOverlayButton.addEventListener('click', ()=> {
    tablesContainer.textContent="";
    for(let i=0; i<6; i++){
        const tableData=JSON.parse(localStorage.getItem(cate[i]))
        console.log(tableData)

        if(tableData){
            const table=document.createElement("table");

            //creating header
            const headerRow=document.createElement("tr")
            const headerCell=document.createElement("th")
            headerCell.textContent=cate[i]
            headerRow.appendChild(headerCell)
            table.appendChild(headerRow)

            //creating rows
            tableData.forEach(dataItem => {
                const row=document.createElement("tr")
                const cell=document.createElement("td")
                cell.textContent=dataItem.currentusername+":"+dataItem.score
                row.appendChild(cell)
                table.appendChild(row)
            })
            tablesContainer.appendChild(table);
        }
    }

    overlay.style.display='flex'
})

overlay.addEventListener('click', ()=> {
    overlay.style.display='none'
})


console.log(category);