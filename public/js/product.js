// Handles the adding of an item to the cart, adjusts stock levels when that product is added
// Also makes sure that user adds proper quantities of items, and within the stock range
let addAlert = document.querySelector("#alert");

const newCartItem = async (event) => {
  event.preventDefault();
  let product_id;
  let quantity;

  if (event.target.hasAttribute("data-id")) {
    product_id = event.target.getAttribute("data-id");
    product_name = event.target.getAttribute("data-descr");
    stock = event.target.getAttribute("data-val");
  }
  quantity = document.querySelector("#p" + product_id).value.trim();
  const newStock = stock - quantity;
  
  let check2 = quantity > 0;
  let check = newStock >= 0

  if (product_id && quantity && check && check2) {
    const response = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({ product_id, quantity, newStock }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/cart");
    } else if (response.status = 404) {
      alert("item already added to cart!")
    } else {
      alert("Failed to create item");
    }
  }
  else {
    alert(`Invalid request of stock to add to cart`);
  }
};

[...document.querySelectorAll(".new-item-list")].forEach((el) =>
  el.addEventListener("click", newCartItem)
);
