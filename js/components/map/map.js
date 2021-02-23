import { BaseView } from "../baseView/baseView.js";

const hydrate = (html) => {
  class MapView extends BaseView {
    constructor() {
      super();
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-map-view", MapView);
  
  return MapView;
};

export default hydrate;
