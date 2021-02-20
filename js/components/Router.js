import { lazyLoadComponent } from "../util/lazyLoadComponent.js";

const VALID_VIEWS = ["home", "map", "form", "about", "data"];

export class RouterView extends HTMLElement {
  constructor() {
    super();
    this.#changeView();
  }

  #changeView = async () => {
    const view = window.location.hash.split("#").pop();
    if (view) {
      console.log(view);
      if (VALID_VIEWS.includes(view)) {
        this.view = view;
        await lazyLoadComponent(this.view);
        this.innerHTML = `<app-${this.view}-view></app-${this.view}-view>`;
        console.log(`app-${window.location.hash.split("#").pop()}-view`);
      }
    } else {
      window.location.hash = "#home";
    }
  };

  // Fires when an instance was inserted into the document
  connectedCallback() {
    window.onhashchange = this.#changeView;
  }

  // Fires when an instance was removed from the document
  disconnectedCallback() {
    window.onhashchange = undefined;
  }

  // Fires when an attribute was added, removed, or updated
  attributeChangedCallback(attrName, oldVal, newVal) {}

  // Fires when an element is moved to a new document
  adoptedCallback() {}
}

window.customElements.define("app-router-view", RouterView);
