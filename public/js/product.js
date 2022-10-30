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
  if (product_id && quantity) {
    const response = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({ product_id, quantity, newStock }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.querySelector("#p" + product_id).value = " ";
      let time = 3;
      addAlert.innerText = "Added "+product_name+" to your cart!";
      addAlert.style.backgroundColor = "lightgreen";
      let startTimer = setInterval(function () {
        time--;
        if (time === 0) {
          addAlert.innerText = " ";
          addAlert.style.backgroundColor = "transparent";
          clearInterval(startTimer);
        }
      }, 1000);
    } else {
      alert("Failed to create item");
    }
  }
};

[...document.querySelectorAll(".new-item-list")].forEach((el) =>
  el.addEventListener("click", newCartItem)
);
