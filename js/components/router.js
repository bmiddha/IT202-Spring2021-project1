import "../components/about.js";
import "../components/home.js";
import "../components/filters.js";
import "../components/map.js";
import "../components/data.js";

const VALID_VIEWS = ["home", "map", "filters", "about", "data"];

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
        this.innerHTML = `<app-${this.view}-view></app-${this.view}-view>`;
      }
    } else {
      window.location.hash = "#home";
    }
  };

  connectedCallback() {
    window.addEventListener("hashchange", this.changeView);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.changeView);
  }
}

window.customElements.define("app-router-view", RouterView);

export default RouterView;
