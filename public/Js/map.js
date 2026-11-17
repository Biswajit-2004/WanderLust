mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', 
        center: listing.geometry.coordinates, 
        zoom: 9 
    });

  const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h4>${listing.title}</h4><p>${listing.location}</p>`)
    .setMaxWidth("300px");

const marker1 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);