import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}&category=${product.Category}">
        <img src="${product.Images?.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand?.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      this.renderList(list);

      // Update the page title dynamically
      const titleElement = document.querySelector(".title");
      if (titleElement) {
        titleElement.textContent =
          this.category.charAt(0).toUpperCase() + this.category.slice(1);
      }
    } catch (error) {
      console.error("Failed to initialize product list:", error);
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

