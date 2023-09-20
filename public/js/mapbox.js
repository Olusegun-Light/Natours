export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibGlnaHQtc2VucGFpIiwiYSI6ImNsbHVzd3VvZzE3anEzZ256YmJ1ZnB5Y24ifQ.d_OQRh8pIII1JFEcGPEpQg";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/light-senpai/cllvv97q000et01qx7iv7g57a",
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 10,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
