module.exports = {
    
    format_date: (date) => {
      return date.toLocaleDateString();
    },

    format_amount: (amount) => {
      return parseInt(amount).toLocaleString();
    },
    multiply_price: (price, quantity) => {
      return price * quantity;
    },
    find_sum: (products) => {
      let sum = 0;
      for (let i = 0; i < products.length; i++){
        let bag = products[i].price * products[i].cart.quantity;
        sum = sum + bag;
      }
      return sum
    }
}