import ProductData from './ProductData.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Cargar header y footer dinámicamente
loadHeaderFooter();

// Obtener la categoría de la URL (?category=backpacks, etc.)
const category = getParam('category');

// Crear instancia del origen de datos
const dataSource = new ProductData();

// Seleccionar el elemento del DOM donde mostrar la lista
const listElement = document.querySelector('.product-list');

// Crear instancia de la clase ProductList con la categoría y datos
const myList = new ProductList(category, dataSource, listElement);

// Iniciar la carga de productos
myList.init();
