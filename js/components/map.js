// Google Maps API
import { Loader } from "https://cdn.skypack.dev/@googlemaps/js-api-loader";

import { BaseView } from "./baseView.js";
import { getFilteredData } from "../util/data.js";
import { mapPing, ruler } from "../util/icons.js";

const googleMapsAPIKey = "AIzaSyD6ZIMU-bD2Z8J8oeWZwZQ86VI6NhAH6p8";

class MapView extends BaseView {
  constructor() {
    super();
    this.wrapper.className = "container-fluid pt-4";
    this.wrapper.innerHTML = `
      <div id="map" style="width: 100%; height: calc(100vh - 100px);">
        <div id="map-loading" class="pt-3 text-center">
          <div class="spinner-border" role="status"></div>
          <p class="lead">Loading</p>
        </div>
      </div>
      `;
    this.mapDiv = document.getElementById("map");
  }

  connectedCallback() {
    this.animateIn();
    this.initMap().then(() => this.drawMarkers());
  }

  async initMap() {
    const loader = new Loader({
      apiKey: googleMapsAPIKey,
      version: "weekly",
      libraries: ["places"],
    });

    const mapOptions = {
      center: { lat: 41.87191466527637, lng: -87.64796955882323 },
      zoom: 11,
    };
    await loader.load();
    this.map = new google.maps.Map(this.mapDiv, mapOptions);
  }

  async drawMarkers() {
    const locations = await getFilteredData();
    if (locations) {
      this.markers = locations.map(
        ({ community_area_name, pin, latitude, longitude, address, sq_ft }) => {
          const position = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          };
          if (position.lat && position.lng) {
            const marker = new google.maps.Marker({
              position,
              map: this.map,
              title: community_area_name,
            });
            const contentString = `
              <div class="card">
                <div class="card-header">
                  ${pin ?? "Not Available"}
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    ${community_area_name ?? "Not Available"}
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    ${ruler}
                    ${sq_ft ?? "Not Available"}
                  </h6>
                </div>
                <div class="card-footer text-muted">
                  ${mapPing}
                  ${address ?? "Not Available"}
                </div>
              </div>
              `;
            const infoWindow = new google.maps.InfoWindow({
              content: contentString,
            });
            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });
            return marker;
          } else {
            return undefined;
          }
        }
      );
    }
  }
}
window.customElements.define("app-map-view", MapView);

export default MapView;
