const hydrate = (html) => {
  class HomeView extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = html;
    }

    // Fires when an instance was inserted into the document
    connectedCallback() {
      console.log("mounting");
    }

    // Fires when an instance was removed from the document
    disconnectedCallback() {
      console.log("removing");
    }

  }
  console.log('hydrating')
  window.customElements.define("app-home-view", HomeView);
}

export default hydrate;
