// API information.
const apiUrl = 'https://front-br-challenges.web.app/api/v1/ramen-go/';

const brothData = [
    {
        id: "salt",
        icon: "salt",
        title: "Salt",
        description: "Simple like the seawater, nothing more",
        price: 10
    },
    {
        id: "shoyu",
        icon: "shoyu",
        title: "Shoyu",
        description: "The good old and traditional soy sauce",
        price: 10
    },
    {
        id: "miso",
        icon: "miso",
        title: "Miso",
        description: "Paste made of fermented soybeans",
        price: 10
    }
]

const meatData = [
    {
        id: "yasai_vegetarian",
        icon: "yasai",
        title: "Yasai Vegetarian",
        description: "A delicious vegetarian lamen with a selection of season vegetables.",
        price: 10
    },
    {
        id: "chasu",
        icon: "pork",
        title: "Chasu",
        description: "A sliced flavourful pork meat with a selection of season vegetables.",
        price: 10
    },
    {
        id: "karaague",
        icon: "chicken",
        title: "Karaague",
        description: "Three units of fried chicken, moyashi, ajitama egg and other vegetables.",
        price: 10
    }
]

var selectedMeat = ''
var selectedBroth = ''

var meatSwiper = document.querySelector("#meat-swiper")
var brothSwiper = document.querySelector("#broth-swiper")
var placeOrderBtn = document.querySelector("#place-order-btn")

meatSwiper.innerHTML = meatData.map(item => renderSwiper(item, 'meat')).join('')
brothSwiper.innerHTML = brothData.map(item => renderSwiper(item, 'broth')).join('')

meatSwiper.addEventListener("click", buttonStateHandler);
brothSwiper.addEventListener("click", buttonStateHandler);

var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true,
    breakpoints: {
        768: {
            spaceBetween: 15,
            slidesPerView: 3,
            centeredSlides: false
        }
    }
})

function renderSwiper (item, type) {
    return `<div class="swiper-slide">
    <div name="${type}" id="${item.id}" onClick="selectItem(${item.id})" class="card">
        <img width="auto" height="104px" src="./assets/icons/${item.icon}/inactive.svg" />
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <div class="price">US$ ${item.price}</div>
    </div>
</div>
`
}

function isMeat (item) { return meatData.some(broth => broth.id === item.id) }
function isBroth (item) { return brothData.some(broth => broth.id === item.id) }

function selectItem (item) {
    setActiveItemClass(item)
    return isMeat(item) ? selectedMeat = item.id : selectedBroth = item.id
}

function setActiveItemClass (item) {
    let type = isMeat(item) ? 'meat' : 'broth'
    let swiperCards = document.getElementsByName(type)

    for (let card of swiperCards) {
        if (item.id === card.id) {
            card.classList.add('active')
            let imgEl = card?.getElementsByTagName('img')[0]
            let img = imgEl.src.replace('/inactive', '/active')
            imgEl.src = img
        } else {
            card.classList.remove('active')
            let imgEl = card?.getElementsByTagName('img')[0]
            if (imgEl.src.indexOf('/active')) {
                let img = imgEl.src.replace('/active', '/inactive')
                imgEl.src = img
            }
        }
    }
}

function buttonStateHandler () {
    if (selectedBroth && selectedMeat) placeOrderBtn.disabled = false
}

function placeOrder () {
    fetch(`${apiUrl}?meat=${selectedMeat}&broth=${selectedBroth}`).then(res => res.json())
        .then(function (data) {
            localStorage.setItem("orderedItem", JSON.stringify(data));
            location.replace('/success.html')
        });
}



