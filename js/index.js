import { lazyLoadComponent } from "./util/lazyLoadComponent.js";
import "./components/router/router.js";
import "./components/pwa/pwa.js";

const init = async () => {
  await lazyLoadComponent("navbar");
  document.getElementById("root").innerHTML = `
    <app-pwa></app-pwa>
    <app-navbar></app-navbar>
    <app-router-view></app-router-view>
  `;
};

init();
