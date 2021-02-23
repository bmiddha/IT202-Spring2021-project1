import { getData } from "../../util/apiClient.js";
import { BaseView } from "../baseView/baseView.js";

const mapPing = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-geo-alt"
  viewBox="0 0 16 16"
>
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
</svg>
`;

const ruler = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-rulers"
  viewBox="0 0 16 16"
>
  <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1H1z" />
</svg>
`;

const hydrate = (html) => {
  class DataView extends BaseView {
    constructor() {
      super("data");
      this.wrapper.innerHTML = html;
      this.loadingNode = document.createElement("div");
      this.loadingNode.classList = "pt-3 text-center";
      this.loadingNode.innerHTML = `
        <div class="spinner-border" role="status"></div>
        <p class="lead">Loading</p>
      `;
      this.cardsNode = document.createElement("div");
    }

    connectedCallback() {
      this.animateIn();
      if (this.cardsNode.parentNode) {
        this.wrapper.removeChild(this.cardsNode);
      }
      this.setLoading(true);
      getData().then((data) => {
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
            <div class="card-body">
              <h5 class="card-title">
                ${community_area_name} - ${pin}
              </h5>
              <p class="card-text">
                ${mapPing}
                ${address}
              </p>
              <h6 class="card-subtitle mb-2 text-muted">
                ${ruler}
                ${sq_ft}
              </h6>
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
