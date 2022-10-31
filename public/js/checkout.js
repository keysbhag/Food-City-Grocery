// handles the checkout form to make sure there is valid entry of credit card info and address 
const checkoutSubmission = async (event) => {
  event.preventDefault();

  const creditCard = document.querySelector("#creditcard-num").value.trim();
  const month = document.querySelector("#month").value.trim(); 
  const year = document.querySelector("#year").value.trim();
  const address = document.querySelector('#address').value.trim();
  const name = document.querySelector('#name').value.trim();

  if (creditCard && month && year && address && name) {
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ creditCard, month, year }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/success");
    } else {
      alert(`Invalid Entry of Credit Card Info!`);
    }
  }
};

document
  .querySelector("#checkout-form")
  .addEventListener("submit", checkoutSubmission);
