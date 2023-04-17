const countCart = document.querySelector('#numberCart');
const countWish = document.querySelector('#numberWish');
const cartItemContainer = document.querySelector('#cart-item');
const updateCart = document.querySelector('#update');
const subtotal=document.querySelector('#subtotal');
const total = document.querySelector('#total');

updateCart.addEventListener('click', updateLocal);

let arr = [];
updateDom();
function updateDom() {
    if (localStorage.getItem('cart') == null || localStorage.getItem('cart') == '[]') {
        cartItemContainer.innerHTML = '<h3>There is no product.<h3/>';
        countCart.innerHTML = '(' + 0 + ')';
    } else {
        arr = JSON.parse(localStorage.getItem('cart'));
        countCart.innerHTML = '(' + (arr.length) + ')';
        // creat dom and add to cart item
        cartItemContainer.innerHTML = '';
        arr.map(val => {
            cartItemContainer.innerHTML += `
                <div class="item-c" unic-id='${val.itemId}'>
                    <div class="item-c-img">
                        <div class="removeIcon">
                            <span onclick='removeItem()'>X</span>
                        </div>
                        <figure>
                            <img src="${val.src}" alt="">
                        </figure>
                        <strong>${val.name}</strong>
                    </div>
                    <div class="item-c-price">${val.price}$</div>
                    <div class="quantity">
                        <div class="quantityBox">
                            <div class="count">${val.count}</div>
                            <div>
                                <div class="inc" onclick='increase()'><i class="bi bi-chevron-up"></i></div>
                                <div class="dec" onclick='decrease()'><i class="bi bi-chevron-down"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="subtotal">${(val.count * val.price)}$</div>
                </div>`;
        })
    }
    let b = 0;
    b = arr.reduce((total,val)=>{
        return (total + (val.price)*(val.count))
    },0)
    subtotal.innerHTML =b+ '$';
    total.innerHTML =b+ '$';
}



let wish = [];
if (localStorage.getItem('wish') == null) {
    countWish.innerHTML = '(' + 0 + ')';
} else {
    wish = JSON.parse(localStorage.getItem('wish'));
    countWish.innerHTML = '(' + (wish.length) + ')';
}


// increase count function
function increase(){
    let _unic = (((((event.target).parentElement).parentElement).parentElement).parentElement).parentElement.getAttribute('unic-id');
    let idx = arr.findIndex((x) => x.itemId === _unic);
    arr[idx].count = ++arr[idx].count;
    ((event.target.parentElement).parentElement).previousElementSibling.innerHTML = arr[idx].count;
}

// decrease count function
function decrease(){
    let c = ((event.target.parentElement).parentElement).previousElementSibling.innerHTML;
    let _unic = (((((event.target).parentElement).parentElement).parentElement).parentElement).parentElement.getAttribute('unic-id');
    let idx = arr.findIndex((x) => x.itemId === _unic);
    if (c > 0) {
        arr[idx].count = --arr[idx].count;
        ((event.target.parentElement).parentElement).previousElementSibling.innerHTML = arr[idx].count;
    }
}

// remove item function
function removeItem(){
    let _unic = (((event.target).parentElement).parentElement).parentElement.getAttribute('unic-id');
    let idx = arr.findIndex((x) => x.itemId === _unic);
    arr.splice(idx, 1);
    (((event.target).parentElement).parentElement).parentElement.remove();
    console.log(event)
}
// add to local storage
function updateLocal() {
    arr.map((val, idx) => {
        if (val.count == 0) {
            arr.splice(idx, 1);
        }
    })
    // add to local storage
    console.log(arr);
    localStorage.setItem('cart', JSON.stringify(arr));
    console.log(localStorage.getItem('cart'));
    updateDom();
}

