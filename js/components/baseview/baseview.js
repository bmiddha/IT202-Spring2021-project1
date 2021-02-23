export class BaseView extends HTMLElement {
  constructor() {
    super();
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("view-wrapper");
    this.style.position = "relative";
    this.wrapper.style.position = "relative";
    this.appendChild(this.wrapper);
  }

  // Fires when an instance was inserted into the document
  connectedCallback() {
    this.wrapper.animate(
      [
        { opacity: 0, top: "25px" },
        { opacity: 1, top: "0px" },
      ],
      250
    );
  }

  // Fires when an instance was removed from the document
  async disconnectedCallback() {
    this.wrapper.animate([
      { opacity: 1, top: "0px" },
      { opacity: 0, top: "-25px" },
    ], 500);
    return animation.finished;
  }
}
