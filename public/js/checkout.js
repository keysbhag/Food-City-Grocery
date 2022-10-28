const checkoutSubmission = async (event) => {
  event.preventDefault();

  const creditCard = document.querySelector("#creditcard-num").value.trim(); // may have to parseint
  const month = document.querySelector("#month").value.trim(); // may have to parseint
  const year = document.querySelector("#year").value.trim(); // may have to parseint
  const address = document.querySelector('#address').value.trim();
  const name = document.querySelector('#name').value.trim();

  if (creditCard && month && year && address && name) {
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ creditCard, month, year }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/success"); //change the endpoint
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#checkout-form")
  .addEventListener("submit", checkoutSubmission);
