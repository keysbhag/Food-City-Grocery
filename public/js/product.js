const newCartItem = async (event) => {
  event.preventDefault();
  let product_id;
  let quantity;

  if (event.target.hasAttribute("data-id")) {
    product_id = event.target.getAttribute("data-id");
  }
  quantity = document.querySelector("#p" + product_id).value.trim();
  console.log(quantity);

  if (product_id && quantity) {
    const response = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/cart`); // adjust later
    } else {
      alert("Failed to create item");
    }
  }
};

[...document.querySelectorAll(".new-item-list")].forEach((el) =>
  el.addEventListener("click", newCartItem)
);