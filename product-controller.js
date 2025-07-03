//Glue btw Model and UI(View)
//Controller UI I/O

import productOperations from "../services/product-operations.js";

//data exchange btw view and model
async function loadPizzas(){
const pizzas=await productOperations.loadProducts();
console.log('Pizzas are',pizzas);
for(let pizza of pizzas){
    preparePizzaCard(pizza);
    
}
}

loadPizzas();
/*
 <div class="col-4">
                     <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
                    </div>
*/

function addToCart(){
    console.log('Add to cart clicked',this);  //this -keyword (current calling refernce)
    const currentButton=this;
    const pizzaId=currentButton.getAttribute('product-id');
    console.log('Pizza Id is',pizzaId);
    productOperations.search(pizzaId);
    printBasket();
}

function printBasket(){
   const cartProducts= productOperations.getProductsInCart();
   const basket=document.querySelector('#basket');
   basket.innerHTML='';
   for(let product of cartProducts){
    const li=document.createElement('li');
    li.innerText=`${product.name} Rs.${product.price}/-`;
    basket.appendChild(li);
}
}


function preparePizzaCard(pizza) {
    const outputDiv = document.querySelector('#output');

    const colDiv = document.createElement("div");
    colDiv.className = 'col-md-4 mb-3';

    const cardDiv = document.createElement("div");
    cardDiv.className = 'card h-100';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    cardDiv.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;

    const ptag = document.createElement('p');
    ptag.className = 'card-text';
    ptag.innerText = pizza.desc;

    const button = document.createElement('button');
    button.setAttribute('product-id',pizza.id);
    button.addEventListener('click',addToCart);  //Event Bind
    button.className = 'btn btn-primary';
    button.innerText = 'Add to Cart';

    cardBody.appendChild(h5);
    cardBody.appendChild(ptag);
    cardBody.appendChild(button);

    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    outputDiv.appendChild(colDiv);
}
