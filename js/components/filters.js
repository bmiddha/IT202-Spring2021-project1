import { getFilteredData } from "../util/data.js";
import { getFilter } from "../util/data.js";
import { BaseView } from "./baseView.js";
import { viewRedirect } from "./router.js";

class FiltersView extends BaseView {
  constructor() {
    super("filters");
    this.inputs = [
      {
        type: "text",
        id: "address",
        label: "Address",
      },
      {
        type: "text",
        id: "ward",
        label: "Ward Number",
      },
      {
        type: "text",
        id: "pin",
        label: "Property Index Number",
      },
      {
        type: "text",
        id: "zip_code",
        label: "Zip Code",
      },
      {
        type: "number",
        id: "sq_ft",
        label: "Area (square feet)",
      },
    ];
  }

  connectedCallback() {
    this.animateIn();
    this.drawForm();
  }

  drawForm() {
    const cachedFilter = getFilter();
    if (!this.form) {
      this.form = document.createElement("form");
      this.wrapper.appendChild(this.form);
    }
    if (!this.form.onsubmit) {
      this.form.onsubmit = this.submitHandler;
    }
    const inputsHtml = this.inputs.map(({ id, label }) => {
      const value = cachedFilter?.[id]?.value ? cachedFilter?.[id]?.value : "";
      const regex = cachedFilter?.[id]?.regex
        ? cachedFilter?.[id]?.regex
        : false;
      return `
          <!-- ${id} | ${label} | input -->
          <div class="form-group">
            <label for="${id}-input" class="form-label">${label}</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter ${label} Filter"
                aria-label="Enter ${label} Filter"
                id="${id}-input"
                value="${value}"
              />
              <div class="input-group-append">
                <input
                  type="checkbox"
                  class="btn-check"
                  id="${id}-regex"
                  autocomplete="off"
                  ${regex ? "checked" : ""}
                />
                <label class="btn btn-outline-primary" for="${id}-regex">Regex</label>
              </div>
            </div>
          </div>
        `;
    });
    this.form.innerHTML = `
        ${inputsHtml.join("")}
        <button type="submit" class="btn btn-primary">Submit</button>
      `;
    this.inputs = this.inputs.map((input) => ({
      ...input,
      inputTag: document.getElementById(`${input.id}-input`),
      regexTag: document.getElementById(`${input.id}-regex`),
    }));
  }

  submitHandler = async (event) => {
    event.preventDefault();
    const inputValues = Object.fromEntries(
      this.inputs.map(({ id, inputTag, regexTag, type }) => [
        id,
        { value: inputTag.value, regex: regexTag.checked, type },
      ])
    );
    await getFilteredData(inputValues);
    viewRedirect("data");
  };
}

window.customElements.define("app-filters-view", FiltersView);

export default FiltersView;
