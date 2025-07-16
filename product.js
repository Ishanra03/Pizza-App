// scripts/MODELS/product.js

class Product {
    constructor(id, name, desc, price, url) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.url = url;
        this.isAddedInCart = false;  // ✅ Default value
    }
}

export default Product;
