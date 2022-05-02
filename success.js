var orderedItemDescription = document.querySelector("#ordered-item-description")
var orderedItemImg = document.querySelector("#ordered-item-image")

var order = JSON.parse(localStorage.getItem('orderedItem'))

orderedItemDescription.innerText = order.data.name
orderedItemImg.src = order.data.image

function placeNewOrder() {
    localStorage.removeItem('orderedItem')
    location.replace('/')
}