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


// adding cart items in local storage

let itemsInCart=JSON.parse(localStorage.getItem("cartInLocalStorage"))|| [];
try {
  if(!itemsInCart)
  {
    let emptyCart=[];
    localStorage.setItem("cartInLocalStorage",JSON.stringify(emptyCart));
  }
} catch (error) {
  console.log('error',error.message);
  
}

document.addEventListener("click",(e)=>{

  const productButton=e.target.closest(".add-btn");
  const productId=Number(productButton.dataset.id);

  const product= productsInLocalStorage.find((p)=>p.id===productId);
 
  addToCart(product);
})

function addToCart(newItem)
{
    itemsInCart=JSON.parse(localStorage.getItem("cartInLocalStorage"))||[];
    console.log('cart in local storage', itemsInCart);

    if(itemsInCart.length===0)
    {
      alert("cart is empty");
    }

    let indexOfItem=itemsInCart.findIndex((item)=>item.id===newItem.id);
    if(indexOfItem===-1)
    {
      // add this item with a prop quantity set to 1
      itemsInCart.push({...newItem,quantity:1});
    }else{
      //  add this item and increase 1 to quantity
      itemsInCart[indexOfItem]={
        ...itemsInCart[indexOfItem],quantity:itemsInCart[indexOfItem].quantity+1
      }
    }



  localStorage.setItem("cartInLocalStorage",JSON.stringify(itemsInCart))

}