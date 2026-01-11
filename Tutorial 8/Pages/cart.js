const cartDiv = document.querySelector(".cartDiv");
console.log("cart div ", cartDiv);

const itemsInCart = JSON.parse(localStorage.getItem("cartInLocalStorage"));
console.log("items in cart ", itemsInCart);

function singleItemDisplay(item) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");
  itemDiv.innerHTML = `
 
          
          <div class="productImg">
            <img src=${item.image} alt="" />
          </div>
          
          <div class="productDetailsDiv">
            <h3>${item.title.slice(30)}</h3>
            <div class="productDetails">
              <span> Rate:${item.rating.rate} Category: ${item.category} </span>
              <span class="productPrice">${item.price}$</span>
            </div>
            <div class="editProductQty">
              <div class="changeQty">
                <div class="decrease">
                  <img src="/assets/icons/decrease.svg" alt="" />
                </div>
                <span>${item.quantity}</span>
                <div class="increase">
                  <img src="/assets/icons/add.svg" alt="" />
                </div>
              </div>
              <div class="removeBtn">
                <span>Remove</span>
              </div>
            </div>
          </div>
        

`;

  return itemDiv;
}

function allCartDisplay(items) {
  items.map((item) => {
    return cartDiv.appendChild(singleItemDisplay(item));
  });
}

if (itemsInCart.length === 0) {
  alert("there are no items  in cart");
} else {
  allCartDisplay(itemsInCart);
}
