import { loadComponent } from "./util/loadComponent.js";
import "./components/router.js";
import "./components/pwa.js";

const init = async () => {
  await loadComponent("navbar");
  document.getElementById("root").innerHTML = `
    <app-pwa></app-pwa>
    <app-navbar></app-navbar>
    <app-router-view></app-router-view>
  `;
};

init();
