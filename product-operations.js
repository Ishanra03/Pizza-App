// Products CRUD operations
import Product from "../MODELS/product.js";
import doNetworkCall from "../api-client.js";

const productOperations={
    products:[],    //Key-Value
    search(pizzaId){
       const product= this.products.find(currentProduct=>currentProduct.id==pizzaId);
       console.log('Product found:', product);
       product.isAddedInCart=true;
       console.log('Array',this.products);
    },
    getProductsInCart(){
       const productInBasket= this.products.filter(product=>product.isAddedInCart);
       return productInBasket;
    },
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
   console.log('***Product array ',productsArray);
   this.products=productsArray;
   return productsArray;  
    },
    sortProducts(){

    },
    searchProducts(){

    }
}

export default productOperations;
