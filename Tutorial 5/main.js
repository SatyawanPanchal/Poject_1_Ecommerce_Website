const grid = document.querySelector(".grid");
let productsInLocalStorage = [];

function renderCard(pr) {
  const item = document.createElement("div");
  item.className = "card";

  item.innerHTML = `
    <div class="image-div">
            <img src=${pr.image}  alt="">
          </div>
          <div class="description">
            <p> ${pr.description.slice(0,20)}...</p>
          </div>
          <div class="price-rating">
            <span class="price">${pr.price}</span>
            <div class="rating">
              <img src="../assets/icons/star.svg" alt="">
              <span>${pr.rating.rate}</span>
              
            </div>
          </div>
          <div class="two-btns">
            <button class="add-btn">
              <img src="../assets/icons/addToCart.svg" alt="">
              <span>Add</span>
            </button>
            <button class="view-btn">
              Quick View
            </button>
          </div>
    `;

  return item;
}

function renderAllCards(products) {
  if (!products) {
    console.log("products not recieved in render all method");
    return;
  }

  products.map((product) => {
    console.log("product in map", product);
    grid.appendChild(renderCard(product));
  });
}

productsInLocalStorage = JSON.parse(localStorage.getItem("allProducts"));
// console.log("product in ls", productsInLocalStorage);
// in no data in local storage then fetch this
if (!productsInLocalStorage) {
  //  fetching all the products
  fetch("https://fakestoreapi.com/products")
    .then((res) => {
      if (!res.ok) throw new Error("fetch is not properly done");
      return res.json();
    })
    .then((products) => {
      console.log("products fetched ", products);
      localStorage.setItem("allProducts", JSON.stringify(products));

      renderAllCards(products);
    })
    .catch((err) => {
      console.log("error occured ", err.message);
    });
} else {
  // if there is data in local storage
  renderAllCards(productsInLocalStorage);
}

