class NavBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <span class="navbar-brand mb-0 h1"><img src="icons/icon-72x72.png" alt="Land Inventory" height="24"> Land Inventory</span>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item" id="home_nav">
                <a class="nav-link" href="#home">Home</a>
              </li>
              <li class="nav-item" id="filters_nav">
                <a class="nav-link" href="#filters">Filters</a>
              </li>
              <li class="nav-item" id="map_nav">
                <a class="nav-link" href="#map">Map</a>
              </li>
              <li class="nav-item" id="data_nav">
                <a class="nav-link" href="#data">Data</a>
              </li>
              <li class="nav-item" id="about_nav">
                <a class="nav-link" href="#about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      `;
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

export default NavBar;
