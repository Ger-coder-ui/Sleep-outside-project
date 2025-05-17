// src/js/main.js
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { qs } from './utils.mjs';

// Get category from URL or hardcode one
const category = 'tents'; // or get from URL if dynamic

const dataSource = new ProductData();
const listElement = qs('.product-list'); // Make sure your HTML has this class

const productList = new ProductList(category, dataSource, listElement);
productList.init();
