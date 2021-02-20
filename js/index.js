import { lazyLoadComponent } from "./util/lazyLoadComponent.js";
import "./components/Router.js";

const init = async () => {
  await lazyLoadComponent("navbar");
  document.getElementById("root").innerHTML = `
    <app-navbar></app-navbar>
    <app-router-view></app-router-view>
  `;
};

init();
