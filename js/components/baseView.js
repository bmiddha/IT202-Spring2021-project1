export class BaseView extends HTMLElement {
  constructor(name) {
    super();
    this.name = name;
    this.wrapper = document.createElement("div");
    this.style.position = "relative";
    this.wrapper.style.position = "relative";
    this.wrapper.className = "container pt-4";
    this.appendChild(this.wrapper);
  }

  animateIn() {
    return this.wrapper.animate(
      [
        { opacity: 0, top: "25px" },
        { opacity: 1, top: "0px" },
      ],
      350
    );
  }

  connectedCallback() {
    this.animateIn();
  }
}

export default BaseView;
