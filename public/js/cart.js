const updateItemHandler = async (event) => {
  if (event.target.hasAttribute("data-id")){
    const id = event.target.getAttribute("data-id");
    const product_id = event.target.getAttribute("data-descr");
    const quantity = document.querySelector('#c'+id).value;
    const stock = event.target.getAttribute("data-val");
    const origQuan = event.target.getAttribute("data-orig");
    let newStock = 0;
    if (quantity > origQuan) {
      newStock = parseInt(stock) - parseInt(quantity - origQuan);
    } else {
      newStock = parseInt(stock) + parseInt(origQuan - quantity);
    }

    const response = await fetch(`/api/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({ product_id, quantity, newStock }),
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
    const product_id = event.target.getAttribute("data-descr");
    const stock = event.target.getAttribute("data-val");
    const quantity = event.target.getAttribute("data-orig");
    const newStock = parseInt(stock) + parseInt(quantity);

    const response = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ product_id, newStock }),
      headers: {
        "Content-Type": "application/json",
      },
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
