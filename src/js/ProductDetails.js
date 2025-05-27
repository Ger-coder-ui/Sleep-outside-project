import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get product data by ID from the API
    this.product = await this.dataSource.findProductById(this.productId);

    // Render product details into the page
    this.renderProductDetails();

    // Attach event listener for Add to Cart button
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Set product category as title
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);

  // Set brand and name
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  // Set image
  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryLarge; // Puedes cambiar a ExtraLarge si lo prefieres
  productImage.alt = product.NameWithoutBrand;

  // Format price to Euros
  const euroPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;

  // Set color
  document.querySelector("#p-color").textContent =
    product.Colors?.[0]?.ColorName || "N/A";

  // Set description
  document.querySelector("#p-description").innerHTML =
    product.DescriptionHtmlSimple;

  // Set product ID on button for reference (if needed)
  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
