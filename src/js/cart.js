import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

function calculateTotal(cartItems) {
  let total = 0;
  cartItems.forEach(item => {
    total += item.finalPrice * item.quantity; // Make sure your item has price and quantity
  });
  return total.toFixed(2);
}

function updateCartTotal(cartItems) {
  const footer = document.querySelector('.cart-footer');
  const totalElement = document.querySelector('.cart-total');

  if (cartItems.length > 0) {
    footer.classList.remove('hide');
    const total = calculateTotal(cartItems);
    totalElement.textContent = `Total: $${total}`;
  } else {
    footer.classList.add('hide');
  }
}

