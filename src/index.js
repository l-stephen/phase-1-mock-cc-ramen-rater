// write your code here
const ramenMenu = document.querySelector("#ramen-menu")
const ramenImage = document.querySelector(".detail-image")
const ramenName = document.querySelector(".name")
const ramenRestaurant = document.querySelector(".restaurant")
const ramenRating = document.querySelector("#rating-display")
const ramenComment = document.querySelector("#comment-display")
const newRamen = document.querySelector("#new-ramen")
const deleteButton = document.querySelector("#delete-ramen")
const update = document.querySelector("#new-update")
let globalRamen;
//Challenge 1
document.addEventListener("DOMContentLoaded", ()=>{
    fetchData()
})
//Challenge 3
newRamen.addEventListener("submit", (e) => {
    //e.preventDefault();
    addNewRamen(e)
})
deleteButton.addEventListener("click", () => {
    deleteRamen();
})
//fetch the ramen data
function fetchData(){
    fetch("http://localhost:3000/ramens")
    .then((res)=> res.json())
    .then((data) => {
        data.forEach((ramen) => {
            displayImage(ramen)
        })
        showDetails(data[0])
        globalRamen = data[0].id
    })

}
//Challenge 2
function displayImage(ramen){
    console.log(ramen)
    let img = document.createElement("img")
    img.src = ramen.image
    img.id = `id${ramen.id}`
    img.addEventListener('click', ()=> {
        showDetails(ramen)
        updateRamen(ramen)
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
function addNewRamen(event){
    event.preventDefault();
    let newObject = {
        name: event.target["new-name"].value,
        restaurant: event.target["new-restaurant"].value,
        rating: event.target["new-rating"].value,
        comment: event.target["new-comment"].value,
        image: event.target["new-image"].value
    }
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newObject)
    })
    displayImage(newObject)
}
const newRamen2 = document.querySelector("#edit-ramen")
newRamen2.addEventListener("submit", (e) => {
    updateRamen(e)
})
function updateRamen(ramen){
    console.log(ramen)
    let rating = document.getElementById("new-rating")
    rating.value = ramen.rating
    let comment = document.getElementById("new-comment")
    comment.textContent = ramen.comment
    let name = document.getElementById("new-name")
   name.value = ramen.name
    let restaurant = document.getElementById("new-restaurant")
    restaurant.value = ramen.restaurant
    let image = document.getElementById("new-image")
    console.log(ramen)
    image.value = ramen.image
    

    update.addEventListener("click", (e)=> {
        e.preventDefault()
        let newUpdate = {
            name:name.value,
            restaurant: restaurant.value,
            image: image.value,
            rating: rating.value,
            comment: comment.value,
        }
        fetch(`http://localhost:3000/ramens/${ramen.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUpdate)
        })
        showDetails(newUpdate)
    })
}

function deleteRamen(){
    console.log(globalRamen)
    //document.querySelector(`#ramen-menu #id${globalRamen}`).remove()
    showDetails({
        name: "",
        restauarant: "",
        rating: 0,
        comment: "",
        image: ""
    })

    fetch(`http://localhost:3000/ramens/` + globalRamen, {
        method: "DELETE",
    })
    .then(response => response.json())

}