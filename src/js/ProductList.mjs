import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  // Use PrimaryMedium image as specified in requirements
  const productImage = product.Images?.PrimaryMedium || product.Image || '/images/placeholder.jpg';
  
  // Format price to 2 decimal places
  const formattedPrice = product.FinalPrice.toFixed(2);
  
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}&category=${product.Category}">
        <img src="${productImage}" alt="${product.Name}" 
             onerror="this.src='/images/placeholder.jpg'">
        <h2 class="card__brand">${product.Brand?.Name || 'Unknown Brand'}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${formattedPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.fallbackImage = '/images/placeholder.jpg';
  }

  async init() {
    try {
      // Show loading state
      this.listElement.innerHTML = '<div class="loading">Loading products...</div>';
      
      const list = await this.dataSource.getData(this.category);
      
      if (!list || list.length === 0) {
        this.showEmptyState();
        return;
      }
      
      this.renderList(list);
    } catch (error) {
      console.error('ProductList initialization failed:', error);
      this.showErrorState();
    }
  }

  renderList(list) {
    // Add category to each product for template
    const productsWithCategory = list.map(product => ({
      ...product,
      Category: this.category
    }));
    
    renderListWithTemplate(
      productCardTemplate, 
      this.listElement, 
      productsWithCategory
    );
  }

  showEmptyState() {
    this.listElement.innerHTML = `
      <div class="empty-state">
        <p>No products found in this category.</p>
        <a href="/index.html">Back to Home</a>
      </div>
    `;
  }

  showErrorState() {
    this.listElement.innerHTML = `
      <div class="error-state">
        <p>Failed to load products. Please try again later.</p>
        <a href="/index.html">Back to Home</a>
      </div>
    `;
  }
}
