import "./components/router.js";
import "./components/navbar.js";
import "./components/pwa.js";

const init = async () => {
  document.getElementById("root").innerHTML = `
    <app-pwa></app-pwa>
    <app-navbar></app-navbar>
    <app-router-view></app-router-view>
  `;
};

init();
