const updateItemHandler = async (event) => {
  if (event.target.hasAttribute("data-id")){
    const id = event.target.getAttribute("data-id");
    const product_id = event.target.getAttribute("data-descr");
    const quantity = document.querySelector('#c'+id).value;

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

[...document.querySelectorAll(".cart-list")].forEach((el) =>
  el.addEventListener("click", delItemHandler)
);

[...document.querySelectorAll(".edit-list")].forEach((el) =>
  el.addEventListener("click", updateItemHandler)
);

// document
//   .querySelector(".edit-button")
//   .addEventListener("click", updateItemHandler);
