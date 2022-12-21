const ramenMenu = document.querySelector("#ramen-menu");
const ramenImage = document.querySelector(".detail-image");
const ramenName = document.querySelector(".name");
const ramenRestaurant = document.querySelector(".restaurant");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");
const newRamen = document.querySelector("#new-ramen");
document.addEventListener("DOMContentLoaded", ()=>{
    getData();
})
newRamen.addEventListener("submit", (e)=>{
    addNewRamen(e)
})
function getData() {
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(data => {
        data.forEach(ramen => {
            displayImage(ramen)
        })
        showDetails(data[0])
    })
}
function displayImage(ramen) {
    let img = document.createElement("img")
    img.src = ramen.image
    img.addEventListener('click', ()=>{
        showDetails(ramen)
    })
    ramenMenu.appendChild(img)
}
function showDetails(ramen){

    ramenImage.src = ramen.image
    ramenName.textContent = ramen.name
    ramenRestaurant.textContent = ramen.restaurant
    ramenRating.textContent = ramen.rating
    ramenComment.textContent = ramen.comment

}
function addNewRamen(e){
    e.preventDefault();
    let body = {
        name: e.target["new-name"].value,
        restaurant: e.target["new-restaurant"].value,
        rating: e.target["new-rating"].value,
        comment: e.target['new-comment'].value,
        image: e.target["new-image"].value
    }
    displayImage(body)
}
