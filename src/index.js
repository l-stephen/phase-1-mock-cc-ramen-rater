const ramenMenu = document.querySelector("#ramen-menu");
const ramenImage = document.querySelector(".detail-image");
const ramenName = document.querySelector(".name");
const ramenRestaurant = document.querySelector(".restaurant");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");
const newRamen = document.querySelector("#new-ramen");
const deleteButton = document.querySelector("#delete-ramen")
let globalRamen = -1
document.addEventListener("DOMContentLoaded", ()=>{
    getData();
})
newRamen.addEventListener("submit", (e)=>{
    addNewRamen(e)
})
deleteButton.addEventListener('click', ()=>{
    deleteRamen()
})
function getData() {
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(data => {
        data.forEach(ramen => {
            displayImage(ramen)
        })
        showDetails(data[0])
        globalRamen = data[0].id
    })
}
function displayImage(ramen) {
    let img = document.createElement("img")
    img.src = ramen.image
    img.id = `id${ramen.id}`
    img.addEventListener('click', ()=>{
        showDetails(ramen)
        globalRamen = ramen.id
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

function deleteRamen(){
    document.querySelector(`#ramen-menu #id${globalRamen}`).remove()

    showDetails({
        name: '',
        restaurant: '',
        rating: 0,
        comment: '',
        image: ''
    })
    fetch(`http://localhost:3000/ramens/` + globalRamen, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(response => console.log(respone))
    
}
