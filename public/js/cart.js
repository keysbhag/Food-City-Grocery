const newFormHandler = async (event) => {
  event.preventDefault();
  let product_id;
  let quantity;

  if (event.target.hasAttribute("data-id")) { // implement later
    product_id = event.target.getAttribute("data-id"); // ^
  }
  quantity = document.querySelector(`#${product_id}`).value.trim();// adjust later

  if (product_id && quantity) {
    const response = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({ product_id, quantity}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/category/${req.params.id}`);// adjust later
    } else {
      alert("Failed to create project");
    }
  }
};

document
  .querySelector(".new-item-list")
  .addEventListener("submit", newCartItem);
