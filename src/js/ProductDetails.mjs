import { qs, setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // 1. Get product details using the ID from the URL
        this.product = await this.dataSource.findProductById(this.productId);

        // 2. Render the product details into the DOM
        this.renderProductDetails();

        // 3. Add event listener for Add to Cart button (after rendering)
        const addToCartBtn = qs("#addToCart");
        if (addToCartBtn) {
            addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
        }
    }

    renderProductDetails() {
        const element = qs(".product-detail");
        element.innerHTML = `
      <section class="product-detail-card">
        <h3 class="card__brand">${this.product.Brand?.Name || ""}</h3>
        <h2 class="card__name">${this.product.Name}</h2>
        <img src="${this.product.Image}" alt="${this.product.Name}" />
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__description">${this.product.Description}</p>
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </section>
    `;
    }

    addProductToCart() {
        const cart = getLocalStorage("so-cart") || [];
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
    }
}
