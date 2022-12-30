const products = [
  {
    name: "HTML Course",
    image: "html-icon-logo.png",
    price: 500.99,
    qtty: 1,
  },
  {
    name: "CSS Course",
    image: "css-icon-logo.png",
    price: 800.5,
    qtty: 1,
  },
  {
    name: "JS Course",
    image: "js-icon-logo.png",
    price: 2100.0,
    qtty: 1,
  }
];
//current object formatter
const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});

let productsRow = document.querySelector(".products");

for (let product of products) {
  // console.log(product);

  productsRow.innerHTML +=
    `<div class="card product col my-4" style="width: 250px;">
  <img class="card-img-top mt-2 px-3" src="./images/${product.image}" alt="product1">
  <div class="card-body px-3 py-0">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, libero.</p>
      <p class="card-text h3 text-end">${currencyFormater.format(product.price)}</p>
      <p class="card-text3 d-flex justify-content-end"><button class="btn w-75 product-button"><i
                  class="fs-4 bi bi-cart-plus"></i> Add to cart</button></p>

  </div>`;
}

const addToCartBtn = document.querySelectorAll(".product-button");
// 
addToCartBtn.forEach((btn, index) => {
  // console.log(btn);
  btn.addEventListener("click", function () {
    addToCart(products[index]);
  });
});

const cart = [];

function addToCart(product) {
  if (cart.find((item) => item.name == product.name)) {
    // console.log("product already in cart ");
    product.qtty++;

  } else {
    cart.push(product);
  }
  // console.table(cart);
  createRows();
  totalCart();

};

function createRows() {
  let result = "";
  for (let item of cart) {
    result += `
    <div class="cart-row row gx-0">
                <div class="cart-item col-6 ps-md-5 my-2 d-flex align-items-center justify-content-start">
                    <img class="cart-item-image" src="./images/${item.image}" width="100" height="100" alt="js-logo">
                    <div class="cart-item-title h5 ms-2">${item.name}</div>
                </div>
                <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
                    <div class="d-flex">
                        <i class="plus fs-5 bi bi-plus-circle-fill"></i>
                    </div>
                    <div class="text-center m-0 cart-quantity h4 w-25">${item.qtty}</div>
                    <div class="d-flex">
                        <i class="minus fs-5 bi bi-dash-circle-fill"></i>
                    </div>
                </div>
                <div class="col-1 d-flex justify-content-start align-items-center">
                    <i class="del fs-4 bi bi-trash3-fill text-danger"></i>
                </div>
                <div class="cart-price col-3 h5 my-auto text-end p-2 pe-sm-5">${currencyFormater.format(item.price)}</div>
            </div>`;
  }
  document.querySelector(".cart-items").innerHTML = result;
  let plusBtns = document.querySelectorAll(".plus");
  let minusBtns = document.querySelectorAll(".minus");
  plusBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () { plusQtty(index); })
  });
  // minusBtns.forEach((btn, index) => {
  //   btn.addEventListener("click", function () { minusQtty(index); })
  // });
  for (let index = 0; index < minusBtns.length; index++) {

    minusBtns[index].addEventListener("click", function () { minusQtty(index); })

  }
  let deleteBtn = document.querySelectorAll(".del");
  deleteBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      deleteItems(index);
    })
  })
};

function plusQtty(index) {
  cart[index].qtty++;
  createRows();
  totalCart();
};

function minusQtty(index) {
  if (cart[index].qtty == 1) {
    cart.splice(index, 1);
  } else {
    cart[index].qtty--;
  }
  createRows();
  totalCart();
};

function deleteItems(index){
  cart[index].qtty = 1;
  cart.splice(index,1);
  createRows();
  totalCart();
}
let totalAmount = 0;
function totalCart() {
  let totalAmount = 0;
  for (let item of cart) {
    totalAmount += item.price * item.qtty;
  }
  document.getElementById("price").innerHTML = currencyFormater.format(totalAmount);
};

let purchase = document.getElementById("btn-purchase");
purchase.addEventListener("click", buyProduct);
function buyProduct(index){
  if(totalAmount <= 0){
    alert("CART EMPTY! PLEASE CHOOSE A PRODUCT.");
    setTimeout(function(){
      window.location.reload();
   }, 1000);
  }else{
    alert("PURCHASE SUCCESSFUL!");
    setTimeout(function(){
      window.location.reload();
   }, 1000);
  }
};


