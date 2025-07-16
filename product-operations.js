import Product from "../MODELS/product.js";
import doNetworkCall from "../api-client.js";

const productOperations = {
  products: [],

  search(pizzaId) {
    const product = this.products.find(currentProduct => currentProduct.id == pizzaId);
    if (product) {
        if(product.isAddedInCart){
            product.quantity+=1;
        } else {
                product.isAddedInCart = true;
                product.quantity=1;
        }
      
    }
  },

  removeFromCart(pizzaId) {
  const product = this.products.find(currentProduct => currentProduct.id == pizzaId);
  if (product && product.isAddedInCart) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      product.isAddedInCart = false;
      product.quantity = 0;
    }
  }
},


  getProductsInCart() {
    return this.products.filter(product => product.isAddedInCart);
  },

  async loadProducts() {
    const pizzas = await doNetworkCall(); // Load from local or raw JSON
    const pizzaArray = pizzas["Vegetarian"]; // Use correct JSON key

    const productsArray = pizzaArray.map(pizza => {
      const currentPizza = new Product(
        pizza.id,
        pizza.name,
        pizza.menu_description,
        pizza.price,
        pizza.url // Ensure 'url' matches what your JSON provides
      );
      return currentPizza;
    });

    this.products = productsArray;
    return productsArray;
  },

  sortProducts() {
    // Optional: implement sorting if needed
  },

  searchProducts() {
    // Optional: implement search if needed
  }
};

export default productOperations;
