import { BaseView } from "./baseView.js";

class HomeView extends BaseView {
  constructor() {
    super("home");
    this.wrapper.innerHTML = `
      <p>This app lets you search the City of Chicago-Owned Land Inventory data.</p>
      <p>
        You can find more information about the data at
        <a href="https://dev.socrata.com/foundry/data.cityofchicago.org/aksk-kvfp"
          >https://dev.socrata.com/foundry/data.cityofchicago.org/aksk-kvfp</a
        >
      </p>
      <p>
        To get started, navigate to the Search screen, make your selections and
        search. You cna view a list of the results on the Results screen or view a map
        of the results on the Map screen.
      </p>
      `;
  }
}

window.customElements.define("app-home-view", HomeView);

export default HomeView;
