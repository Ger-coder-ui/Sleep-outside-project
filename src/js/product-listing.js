// Import required modules
import ProductData from './ProductData.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Load reusable header and footer components
    await loadHeaderFooter();
    
    // 2. Get product category from URL parameters
    const category = getParam('category');
    
    // 3. Validate category exists
    if (!category) {
      throw new Error('No category specified in URL');
    }
    
    // 4. Format category name (tents → Tents, sleeping-bags → Sleeping Bags)
    const formatCategoryName = (cat) => 
      cat.split('-')
         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
         .join(' ');
    
    // 5. Update page title
    document.querySelector('h1').textContent = `Top Products: ${formatCategoryName(category)}`;
    
    // 6. Initialize product listing system
    const dataSource = new ProductData();
    const listElement = document.querySelector('.product-list');
    
    // Show loading state
    listElement.innerHTML = '<div class="loading">Loading products...</div>';
    
    // 7. Create and initialize product list
    const myList = new ProductList(category, dataSource, listElement);
    await myList.init();
    
  } catch (error) {
    console.error('Failed to initialize product listing:', error);
    // Show error message to user
    const listElement = document.querySelector('.product-list');
    listElement.innerHTML = `
      <div class="error">
        <p>Failed to load products. Please try again later.</p>
        <p>${error.message}</p>
      </div>
    `;
  }
});
