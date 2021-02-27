export class PWA extends HTMLElement {
  invokeServiceWorkerUpdateFlow(registration) {
    this.innerHTML = `
    <div class="alert alert-primary alert-dismissible fade show" role="alert" style="margin-bottom: 0">
        <strong>Update Available.</strong> ${"New version of the app is available."}
        <button type="button" id="refreshApp" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    const refreshBtn = document.getElementById("refreshApp");
    refreshBtn.style.background = refreshBtnBackground;
    refreshBtn.addEventListener("click", () => {
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

const refreshBtnBackground = `transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-repeat' viewBox='0 0 16 16'%3E%3Cpath d='M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z'/%3E%3Cpath fill-rule='evenodd' d='M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z'/%3E%3C/svg%3E") center/1.5em auto no-repeat`;

export default PWA;
