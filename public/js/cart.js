const newCartItem = async (event) => {
  event.preventDefault();
  let product_id;
  let quantity;

  if (event.target.hasAttribute("data-id")) {
    product_id = event.target.getAttribute("data-id");
  }
  quantity = document.querySelector("#p"+product_id).value.trim();
  console.log(quantity);

  if (product_id && quantity) {
    const response = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({ product_id, quantity}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/cart`);// adjust later
    } else {
      alert("Failed to create item");
    }
  }
};

const updateItemHandler = async (event) => {
  if (event.target.hasAttribute("data-id")){
    const id = event.target.getAttribute("data-id");
    const product_id = event.target.getAttribute("data-descr");
    const quantity = document.querySelector(`#${product_id}`).value.trim();

    const response = await fetch(`/api/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({ product_id, quantity }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/cart"); // figure out later
    } else {
      alert("Failed to update item");
    }

  }
}

const delItemHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/cart"); // figure out later
    } else {
      alert("Failed to delete item");
    }
  }
};

[...document.querySelectorAll(".new-item-list")].forEach(el => el.addEventListener("click", newCartItem));

// document
//   .querySelector(".cart-list")
//   .addEventListener("click", delItemHandler);

// document
//   .querySelector(".edit-button")
//   .addEventListener("click", updateItemHandler);
