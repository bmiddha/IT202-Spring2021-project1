export class PWA extends HTMLElement {
  invokeServiceWorkerUpdateFlow(registration) {
    this.innerHTML = `
    <div class="alert alert-primary alert-dismissible fade show" role="alert" style="margin-bottom: 0">
        <strong>Update Available.</strong> ${"New version of the app is available."}
        <button type="button" id="refreshApp" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    document.getElementById("refreshApp").addEventListener("click", () => {
      if (registration.waiting) {
        // let waiting Service Worker know it should became active
        registration.waiting.postMessage("SKIP_WAITING");
      }
    });
  }
  constructor() {
    super();
    if ("serviceWorker" in navigator) {
      // wait for the page to load
      // register the service worker from the file specified
      navigator.serviceWorker.register("./sw.js").then((registration) => {
        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
          this.invokeServiceWorkerUpdateFlow(registration);
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener("updatefound", () => {
          if (registration.installing) {
            // wait until the new Service worker is actually installed (ready to take over)
            registration.installing.addEventListener("statechange", () => {
              if (registration.waiting) {
                // if there's an existing controller (previous Service Worker), show the prompt
                if (navigator.serviceWorker.controller) {
                  this.invokeServiceWorkerUpdateFlow(registration);
                } else {
                  // otherwise it's the first install, nothing to do
                  console.log("Service Worker initialized for the first time");
                }
              }
            });
          }
        });

        let refreshing = false;

        // detect controller change and refresh the page
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (!refreshing) {
            window.location.reload();
            refreshing = true;
          }
        });
      });
    }
  }
}

window.customElements.define("app-pwa", PWA);
