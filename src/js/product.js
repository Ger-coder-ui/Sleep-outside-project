import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// ✅ Solo obtenemos el ID del producto
const productId = getParam("product");

// ✅ No se necesita categoría aquí
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);
product.init();
