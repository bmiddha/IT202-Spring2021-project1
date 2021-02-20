const hydrate = (html) => {
  class NavBar extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = html;
    }

    // Fires when an instance was inserted into the document
    connectedCallback() {}

    // Fires when an instance was removed from the document
    disconnectedCallback() {}

    // Fires when an attribute was added, removed, or updated
    attributeChangedCallback(attrName, oldVal, newVal) {}

    // Fires when an element is moved to a new document
    adoptedCallback() {}
  }

  window.customElements.define("app-navbar", NavBar);
};
export default hydrate;
