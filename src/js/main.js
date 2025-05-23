import { loadHeaderFooter } from "./utils.mjs";
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { qs } from './utils.mjs';
import Alert from './Alert.js'; // 
import { loadHeaderFooter } from "./utils.mjs";
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { qs } from './utils.mjs';
import Alert from './Alert.js'; //  Import the alert module

// Load header and footer dynamically
loadHeaderFooter();

// Initialize product list
const category = 'tents';
const dataSource = new ProductData();
const listElement = qs('.product-list');
const productList = new ProductList(category, dataSource, listElement);
productList.init();

// Initialize and show alerts
const alerts = new Alert('/alerts.json', 'main'); // 👈 Make sure the JSON is in /public
alerts.showAlerts();

// Initialize product list
const category = 'tents';
const dataSource = new ProductData();
const listElement = qs('.product-list');
const productList = new ProductList(category, dataSource, listElement);
productList.init();

// Initialize and show alerts
const alerts = new Alert('/alerts.json', 'main'); // 
alerts.showAlerts();
