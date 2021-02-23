const hydrate = (html) => {
  class NavBar extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = html;
      this.active = "home";
      this.updateActiveLink();
    }

    updateActiveLink() {
      const view = window.location.hash.split("#").pop();
      if (view) {
        this.view = view;
        document.querySelector(`.active`)?.classList.remove("active");
        document.querySelector(`#${this.view}_nav`).classList.add("active");
      }
    }

    connectedCallback() {
      window.addEventListener("hashchange", this.updateActiveLink);
    }

    disconnectedCallback() {
      window.removeEventListener("hashchange", this.updateActiveLink);
    }
  }

  window.customElements.define("app-navbar", NavBar);

  return NavBar;
};
export default hydrate;
