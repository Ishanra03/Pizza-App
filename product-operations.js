// Products CRUD operations
import Product from "../MODELS/product.js";
import doNetworkCall from "../api-client.js";

const productOperations={
    async loadProducts(){
   const pizzas = await doNetworkCall();
   const pizzaArray = pizzas['Vegetarian'];
  const productsArray= pizzaArray.map(pizza=>{
    const curentPizza=new Product(pizza.id,
        pizza.name,
        pizza.menu_description,
        pizza.price,
        pizza.URL);
    return curentPizza;
   });
   console.log('Product array ',productsArray);
   return productsArray;  
    },
    sortProducts(){

    },
    searchProducts(){

    }
}

export default productOperations;