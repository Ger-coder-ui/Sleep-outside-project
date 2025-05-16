import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Corrected function: now adds multiple products to the cart
function addProductToCart(product) {
  // Step 1: Get the current cart from localStorage
  let cart = getLocalStorage("so-cart") || [];

  // Add the new product to the cart array
  cart.push(product);

  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

//  Event handler for "Add to Cart" button
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

//  Add event listener to the "Add to Cart" button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
