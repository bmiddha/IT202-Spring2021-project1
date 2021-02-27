import { BaseView } from "./baseView.js";

class AboutView extends BaseView {
  constructor() {
    super("about");
    this.wrapper.innerHTML = `
      <article>
        <p class="lead">
          This project has been developed by Bharat Middha for the
          <em>IT 202</em> course at UIC.
        </p>
        <h3>How does it work?</h3>
        <p>
          The webapp uses the
          <a href="https://html.spec.whatwg.org/multipage/custom-elements.html"
            >HTML Custom Elements</a
          >
          to render various components and views of the application. The application
          uses a custom hash based router to provide a multi-page feel in a SPA.
        </p>
        <h4>Caching</h4>
        <p>
          The application uses the <code>serviceWorker</code> and browser
          <code>localStorage</code> APIs to cache fetch responses, filters, and
          filtered data across reloads.
        </p>
        <h3>External Libraries</h3>
        <p>
          The project uses Bootstrap 5 for styles and layout, and Google Maps
          JavaScript API to render maps.
        </p>
      </article>
      `;
  }
}

window.customElements.define("app-about-view", AboutView);

export default AboutView;
