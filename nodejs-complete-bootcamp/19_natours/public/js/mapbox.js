/* eslint-disable */
exports.displayMap = (locations) => {
  mapboxgl.accessToken = '<your_mapbox_key>';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rjcli/cma8ir5n000h501r4f5on1f7u',
    scrollZoom: false,
    // center: [84.85127325880447, 25.536057412477174],
    // zoom: 14,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((location) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(location.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(location.coordinates)
      .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
