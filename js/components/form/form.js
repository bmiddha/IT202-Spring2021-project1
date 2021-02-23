import { BaseView } from "../baseview/baseview.js";

const hydrate = (html) => {
  class FormView extends BaseView {
    constructor() {
      super();
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-form-view", FormView);
};

export default hydrate;
