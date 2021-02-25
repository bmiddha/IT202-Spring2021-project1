import { getFilteredData, getApiData } from "../../util/apiClient.js";
import { getFilter } from "../../util/filtering.js";
import { BaseView } from "../baseView/baseView.js";

const hydrate = (html) => {
  class FormView extends BaseView {
    constructor() {
      super("form");
      this.wrapper.innerHTML = html;
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
      console.log(this.inputs);
    }

    connectedCallback() {
      this.animateIn();
      this.drawForm();
    }

    drawForm() {
      const cachedFilter = getFilter();
      console.log(cachedFilter);
      if (!this.form) {
        this.form = document.createElement("form");
        this.wrapper.appendChild(this.form);
      }
      if (!this.form.onsubmit) {
        this.form.onsubmit = this.submitHandler;
      }
      const inputsHtml = this.inputs.map(({ id, label }) => {
        const value = cachedFilter?.[id]?.value
          ? cachedFilter?.[id]?.value
          : "";
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
      console.log(inputValues);
      // set loading
      const filtered = await getFilteredData(inputValues);
      console.log(filtered.length);
      console.log((await getApiData()).length);
    };
  }

  window.customElements.define("app-form-view", FormView);

  return FormView;
};

export default hydrate;
