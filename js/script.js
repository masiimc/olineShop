const itemGallery = document.querySelector('.item_gallery>.row');
const purchasedItems = [];
const cartTag = document.querySelector('#containershop');
const cartIcon = document.querySelector('#cartshop');
const ulCart = document.querySelector('#cartDropDown');
const totalBox = document.querySelector('#totalBox');
const countCart = document.querySelector('#numberCart');
const countWish = document.querySelector('#numberWish');
const shadow = document.querySelector('.shadowBox');
const previewBox = document.querySelector('.previewBox');
const totalCart = document.querySelector('#total');



listItems.map((val) => {
    itemGallery.innerHTML += `
        <div class="item" product-data='${val.itemId}' >
            <div class="image">
                <figure>
                    <img src="${val.src}" alt="">
                </figure>
            </div>
            <div class="detail">
                    <div class="name">${val.name}</div>
                    <div class="price">${val.price}$</div>
            </div>
            <a href="#">${val.title}</a>
            <div class="buttonContainer">
                <div>
                    <span>Preview</span>
                    <button class="preview hide"><i class="bi bi-arrows-move"></i></button>
                </div>
                <div>
                <span>wishList</span>
                <button class="wishList hide"><i class="bi bi-heart"></i></button>
                </div>
                <div>
                    <span>Add To Cart</span>
                    <button class="addToCart hide"><i class="bi bi-bag-plus"></i></button>
                </div>
            </div>
        </div>`;

});

// item selectors
const itemEvent = document.querySelectorAll('.item');
const buyBtn = document.querySelectorAll('.buttonContainer>div:last-of-type>.addToCart');
const heartBtn = document.querySelectorAll('.buttonContainer>div:nth-of-type(2)>.wishList');
const preview = document.querySelectorAll('.preview');


itemEvent.forEach((val) => {
    val.addEventListener('mouseenter', mouseEnter1);
    val.addEventListener('mouseleave', mouseLeave1);
})

function mouseEnter1() {
    const _child = this.children[3].children;
    for (let item of _child) {
        item.children[1].classList.remove('hide');
    }
}

function mouseLeave1() {
    const _child = this.children[3].children;
    for (let item of _child) {
        item.children[1].classList.add('hide');
    }
}

cartIcon.addEventListener('mouseenter', function () {
    cartTag.classList.remove('hide');
})
cartTag.addEventListener('mouseenter', function () {
    cartTag.classList.remove('hide');
})
cartIcon.addEventListener('mouseleave', function () {
    cartTag.classList.add('hide');
})
cartTag.addEventListener('mouseleave', function () {
    cartTag.classList.add('hide');
})


// add to cart
buyBtn.forEach((val) => {
    val.addEventListener('click', addToCart)
})

// add to wish list
heartBtn.forEach((val) => {
    val.addEventListener('click', updateWishList);
})

let c = 1;
// working with cat
function addToCart() {
    this.innerHTML = '<i class="bi bi-bag-check"></i>';
    let unicId = (((this.parentElement).parentElement).parentElement).getAttribute('product-data');
    let newItem = listItems.find((x) => {
        return x.itemId == unicId;
    });
    newItem.count = 1;

    let arr;
    if (localStorage.getItem('cart') == null) {
        arr = []
    } else {
        arr = JSON.parse(localStorage.getItem('cart'));
    }

    if (arr.findIndex((x) => { return x.itemId == unicId }) < 0) {
        arr.push(newItem);
        localStorage.setItem('cart', JSON.stringify(arr));
        c = newItem.count;
        updateCart(arr);
    }
}


function updateCart(arr) {
    ulCart.innerHTML = '';
    if (arr.length < 1) {
        ulCart.classList.add('hide2');
        totalBox.classList.add('hide2');
        document.querySelector('.container>p').classList.remove('hide2');
    } else {
        ulCart.classList.remove('hide2');
        totalBox.classList.remove('hide2');
        document.querySelector('.container>p').classList.add('hide2');
    }


    arr.forEach((val) => {
        ulCart.innerHTML += `
            <li item-data='${val.itemId}'>
                <div class="img">
                    <img src="${val.src}" alt="">
                </div>
                <div class="descrip">
                    <span>${val.name}</span>
                    <span>${val.count} X ${val.price}$</span>
                </div>
                <span class="close" onclick='_removeFromCart(this)' ><i class="bi bi-x"></i></span>
            </li>`;
    })
    countCart.innerHTML = '(' + (arr.length) + ')';
    let b = 0;
    b = arr.reduce((total,val)=>{
        return (total + (val.price)*(val.count))
    },0)
    totalCart.innerHTML = b+'.00$';
}

if (localStorage.getItem('cart') != null) {
    let arr = JSON.parse(localStorage.getItem('cart'));
    updateCart(arr);
    itemEvent.forEach((val) => {
        let x = val.getAttribute('product-data');
        arr.forEach((val2) => {
            if (val2.itemId == x) {
                val.children[3].children[2].children[1].innerHTML = '<i class="bi bi-bag-check"></i>';
            }
        })
    })
}



function _removeFromCart(self) {
    let unicode = (self.parentElement).getAttribute('item-data');
    (self.parentElement).remove();
    let arr;
    if (localStorage.getItem('cart') == null) {
        arr = []
    } else {
        arr = JSON.parse(localStorage.getItem('cart'))
    }
    let index = arr.findIndex((val) => {
        return val.itemId == unicode;
    })
    itemEvent.forEach((val) => {
        let x = val.getAttribute('product-data');
        if (x == arr[index].itemId) {
            val.children[3].children[2].children[1].innerHTML = '<i class="bi bi-bag-plus"></i>';
        }
    })

    arr.splice(index, 1);
    countCart.innerHTML = '(' + (arr.length) + ')';
    localStorage.setItem('cart', JSON.stringify(arr));
    updateCart(arr);
}


// working with favList
function updateWishList() {
    let _class = this.children[0].classList.contains('bi-heart');
    let unicId = (((this.parentElement).parentElement).parentElement).getAttribute('product-data');

    if (_class) {
        this.innerHTML = '<i class="bi bi-heart-fill"></i>';
        let newItem = listItems.find((x) => {
            return x.itemId == unicId;
        });

        let arr;
        if (localStorage.getItem('wish') == null) {
            arr = []
        } else {
            arr = JSON.parse(localStorage.getItem('wish'));
        }

        if (arr.findIndex((x) => { return x.itemId == unicId }) < 0) {
            arr.push(newItem);
            localStorage.setItem('wish', JSON.stringify(arr));
        }
        countWish.innerHTML = '('+(arr.length)+')';

    }else{
        this.innerHTML = '<i class="bi bi-heart"></i>';
        let arr;
        if (localStorage.getItem('wish') == null) {
            arr = []
        } else {
            arr = JSON.parse(localStorage.getItem('wish'))
        }
        let index = arr.findIndex((val) => {
            return val.itemId == unicId;
        })
    
        arr.splice(index, 1);
        countWish.innerHTML = '(' + (arr.length) + ')';
        localStorage.setItem('wish', JSON.stringify(arr));
    }

}

if(localStorage.getItem('wish') != null){
    let arr = JSON.parse(localStorage.getItem('wish'));
    countWish.innerHTML = '(' + (arr.length) + ')';
    itemEvent.forEach((val) => {
        let x = val.getAttribute('product-data');
        arr.forEach((val2) => {
            if (val2.itemId == x) {
                val.children[3].children[1].children[1].innerHTML = '<i class="bi bi-heart-fill"></i>';
            }
        })
    })
}

// localStorage.clear('wish');
// localStorage.clear('cart');


// working with preview
preview.forEach((val)=>{
    val.addEventListener('click',showPreview)
})
shadow.addEventListener('click',removePreview)

function showPreview(){
    let _child = ((this.parentElement).parentElement).parentElement.children;
    previewBox.innerHTML = `
        <div class="img">
            <figure>
                <img src="${(_child[0].children[0].children[0]).getAttribute('src')}" alt="">
            </figure>
        </div>
        <div class="text">
                <strong>${_child[1].children[0].innerHTML}</strong>
                <span>${_child[1].children[1].innerHTML}</span>
                <p>${textItem[Math.floor(Math.random()*3)]}</p>
        </div>
        <span onclick="removePreview()"><i class="bi bi-x"></i></span>`;
    shadow.classList.remove('hide2');
    previewBox.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    shadow.style.top =window.scrollY+'px';
    previewBox.style.top = (window.scrollY + (window.innerHeight/2)) +'px';
}

function removePreview(){
    shadow.classList.add('hide2');
    previewBox.classList.add('hide');
    document.body.style.overflow = '';
}


