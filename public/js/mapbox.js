export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY3llbG9uczQ1IiwiYSI6ImNrYjkzdmJmcTBhZ3EydG1kdXhtcTVoMWwifQ.NA8-GUwZDuINu0bJHeiNdw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cyelons45/cka7pqd41030b1ipr0puydhkv', // stylesheet location
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    var popup = new mapboxgl.Popup({
      closeButton: true,
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    var marker = new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {top: 200, bottom: 150, left: 100, right: 100},
  });
};

// var marker = new mapboxgl.Marker({

// })
// .setLngLat([30.5, 50.5])
// .addTo(map);
