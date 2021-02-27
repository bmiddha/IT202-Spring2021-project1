import { BaseView } from "./baseView.js";
import { viewRedirect } from "./router.js";

class HomeView extends BaseView {
  constructor() {
    super("home");
    this.wrapper.innerHTML = `
      <h1 class="display-3">Chicago Land Inventory Data</h2>
      <h2>Getting Started</h2>
      <p>
        View the land inventory data on the 
        <button type="button" class="btn btn-link p-0 redirect-btn" redirect-to="data">
          data page
        </button> as well as a map view on the 
        <button type="button" class="btn btn-link p-0 redirect-btn" redirect-to="map">
          map page
        </button>.
      </p>
      <p>
        To filter the data use the filters on the 
        <button type="button" class="btn btn-link p-0 redirect-btn" redirect-to="filters">
          filters page
        </button>.
      </p>
      <h2>Learn More</h2>
      <p>
        You can find more information about the data at
        <a href="https://dev.socrata.com/foundry/data.cityofchicago.org/aksk-kvfp">
          https://dev.socrata.com/foundry/data.cityofchicago.org/aksk-kvfp
        </a>
      </p>
      `;
  }
  connectedCallback() {
    this.animateIn();
    Array.from(this.wrapper.getElementsByClassName("redirect-btn")).forEach((btn) => {
      btn.onclick = () => viewRedirect(btn.getAttribute("redirect-to"));
    });
  }
}

window.customElements.define("app-home-view", HomeView);

export default HomeView;
