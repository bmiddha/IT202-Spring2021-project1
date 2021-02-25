import "./components/router/router.js";
import "./components/pwa/pwa.js";
import "./components/navbar/navbar.js";

const init = async () => {
  document.getElementById("root").innerHTML = `
    <app-pwa></app-pwa>
    <app-navbar></app-navbar>
    <app-router-view></app-router-view>
  `;
};

init();
