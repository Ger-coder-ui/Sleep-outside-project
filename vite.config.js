import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/", // Sets src as the root directory

  build: {
    outDir: "../dist", // Output directory for production build
    rollupOptions: {
      input: {
        // Main entry points for the application
        main: resolve(__dirname, "src/index.html"), // Home page
        cart: resolve(__dirname, "src/cart/index.html"), // Shopping cart
        checkout: resolve(__dirname, "src/checkout/index.html"), // Checkout page
        product: resolve(__dirname, "src/product_pages/index.html"), // Product detail page
        product_listing: resolve(__dirname, "src/product_listing/index.html"), // Product listing page
      },
    },
  },
});
