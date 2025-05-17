// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// Or a more concise version if you prefer:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// Retrieve data from local storage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click events
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Render a list of items using a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = true) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
