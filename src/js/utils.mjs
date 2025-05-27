// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Add both touchend and click event listeners
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Render static HTML content (e.g., header or footer) into a DOM element
export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Load an external HTML file and return it as a string
export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  return html;
}

// Load and render the header and footer templates into the page
export async function loadHeaderFooter() {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  const headerEl = document.getElementById("main-header");
  const footerEl = document.getElementById("main-footer");

  renderWithTemplate(header, headerEl);
  renderWithTemplate(footer, footerEl);
}


/** added getparam()*/
export function getParam(name, url = window.location.href) {
  const params = new URL(url).searchParams;
  return params.get(name);


}
