import productOperations from "../services/product-operations.js";

let visibleCount = 6;

// Load pizzas and render them
async function loadPizzas() {
  const pizzas = await productOperations.loadProducts();
  console.log("Pizzas are", pizzas);
  renderPizzas();
}

function renderPizzas() {
  const pizzas = productOperations.products;
  const outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = ""; // Clear old content

  const slice = pizzas.slice(0, visibleCount);

  for (let pizza of slice) {
    preparePizzaCard(pizza);
  }

  // Show/Hide Load More
  const loadMoreBtn = document.querySelector("#loadMoreBtn");
  if (visibleCount >= pizzas.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}

// "Add to Cart" handler
function addToCart() {
  console.log("🛒 Add to Cart button clicked"); // Debug
  const pizzaId = this.getAttribute("product-id");
  productOperations.search(pizzaId);
  printBasket();
  showToast("🧀 Added to Cart!");
}



// Print cart items
function printBasket() {
  const cartProducts = productOperations.getProductsInCart();
  const basket = document.querySelector("#basket");
  const totalAmount = document.querySelector("#totalAmount");

  basket.innerHTML = "";
  let total = 0;

  for (let product of cartProducts) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // 🧾 Total per item
    const itemTotal = product.price * product.quantity;
    total += itemTotal;

    li.innerHTML = `
      <div>
        ${product.name} × ${product.quantity}
      </div>
      <div>
        ₹${itemTotal}
        <button class="btn btn-sm btn-danger ms-2 remove-btn" data-id="${product.id}">Remove</button>
      </div>
    `;

    basket.appendChild(li);
  }

  totalAmount.innerText = total;

  // 🔁 Attach event listeners to all remove buttons
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      productOperations.removeFromCart(id);
      printBasket();
    });
  });
}




function showToast(message) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast align-items-center text-white bg-success border-0 show";
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.style.minWidth = "200px";
  toast.style.padding = "10px 15px";
  toast.style.marginTop = "5px";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Auto remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}



// Render individual pizza card
function preparePizzaCard(pizza) {
  const outputDiv = document.querySelector("#output");

  const colDiv = document.createElement("div");
  colDiv.className = "col-md-4 mb-3";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card h-100";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.alt = pizza.name;
  img.src = pizza.url || "https://via.placeholder.com/300x200?text=Pizza";
  cardDiv.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = pizza.name;

  const ptag = document.createElement("p");
  ptag.className = "card-text";
  ptag.innerText = pizza.desc;

  const button = document.createElement("button");
  button.setAttribute("product-id", pizza.id);
  button.addEventListener("click", addToCart);
  button.className = "btn btn-primary";
  button.innerText = "Add to Cart";

  cardBody.appendChild(h5);
  cardBody.appendChild(ptag);
  cardBody.appendChild(button);

  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);
  outputDiv.appendChild(colDiv);
}

// Load more button handler
document.querySelector("#loadMoreBtn").addEventListener("click", () => {
  visibleCount += 3; // Load 3 more pizzas per click
  renderPizzas();
});

loadPizzas();
