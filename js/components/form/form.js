import { BaseView } from "../baseView/baseView.js";

const hydrate = (html) => {
  class FormView extends BaseView {
    constructor() {
      super("form");
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-form-view", FormView);

  return FormView;
};

export default hydrate;
