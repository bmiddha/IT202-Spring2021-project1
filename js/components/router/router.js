import { loadComponent } from "../../util/loadComponent.js";

const VALID_VIEWS = ["home", "map", "form", "about", "data"];

export const viewRedirect = (view) => {
  if (VALID_VIEWS.includes(view)) {
    window.location.hash = `#${view}`;
  }
};

export class RouterView extends HTMLElement {
  constructor() {
    super();
    this.changeView();
  }

  changeView = async () => {
    const view = window.location.hash.split("#").pop();
    if (view) {
      if (VALID_VIEWS.includes(view)) {
        this.view = view;
        await loadComponent(this.view);
        this.innerHTML = `<app-${this.view}-view></app-${this.view}-view>`;
      }
    } else {
      window.location.hash = "#home";
    }
  };

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.");
    console.log(name, oldValue, newValue);
  }

  // Fires when an instance was inserted into the document
  connectedCallback() {
    window.addEventListener("hashchange", this.changeView);
  }

  // Fires when an instance was removed from the document
  disconnectedCallback() {
    window.removeEventListener("hashchange", this.changeView);
  }
}

window.customElements.define("app-router-view", RouterView);

export default RouterView;
