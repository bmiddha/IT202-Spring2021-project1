import { getFilteredData } from "../../util/apiClient.js";
import { mapPing, ruler } from "../../util/icons.js";
import { BaseView } from "../baseView/baseView.js";

const hydrate = (html) => {
  class DataView extends BaseView {
    constructor() {
      super("data");
      this.wrapper.innerHTML = html;
      this.loadingNode = document.getElementById("data-loading");
      this.cardsNode = document.createElement("div");
    }

    connectedCallback() {
      this.animateIn();
      if (this.cardsNode.parentNode) {
        this.wrapper.removeChild(this.cardsNode);
      }
      this.setLoading(true);
      getFilteredData().then((data) => {
        this.setLoading(false);
        this.updateCards(data);
        this.wrapper.appendChild(this.cardsNode);
      });
    }

    updateCards(data) {
      const cardsHtml = data.map(
        ({ community_area_name, pin, address, sq_ft }) =>
          `<div class="col mb-4">
            <div class="card">
            <div class="card-header">
              ${pin}
            </div>
            <div class="card-body">
              <h5 class="card-title">
                ${community_area_name}
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                ${ruler}
                ${sq_ft}
              </h6>
            </div>
            <div class="card-footer text-muted">
              ${mapPing}
              ${address}
            </div>
          </div>
        </div>
        `
      );

      this.cardsNode.innerHTML = `<div class="row row-cols-1 row-cols-md-4">${cardsHtml.join(
        ""
      )}</div>`;
    }

    setLoading(isLoading) {
      if (isLoading) {
        this.wrapper.appendChild(this.loadingNode);
      } else {
        this.wrapper.removeChild(this.loadingNode);
      }
    }
  }

  window.customElements.define("app-data-view", DataView);

  return DataView;
};

export default hydrate;
