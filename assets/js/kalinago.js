
    const markers = [
      {
        coords: [15.4968689, -61.2579357],
        title: "Where I'm from. My home :-)",
        description: "Welcome to my home.",
        image: "kalinago-center.jpg",
        type: "culture"
      },
      {
        coords: [15.5019422, -61.2583682],
        title: "Kalinago Barana Aute",
        description: "Cultural village and heritage center.",
        image: "kalinago-culture-1.png",
        type: "culture"
      },
      {
        coords: [15.4961451, -61.257925],
        title: "Tilou Kanawa Restaurant",
        description: "A blend of traditional cuisine with stunning views.",
        image: "kalinago-craft-2.jpg",
        type: "food"
      },
      {
        coords: [15.4964956, -61.2583294],
        title: "Eezee Side Cassava Delicacies",
        description: "Locally made Cassava Delicacies.",
        image: "kalinago-nature-2.jpg",
        type: "food"
      },
      {
        coords: [15.4997818, -61.2619966],
        title: "Jolly John Park",
        description: "Community recreation and event grounds.",
        image: "kalinago-event-1.jpg",
        type: "view"
      },
      {
        coords: [15.490022, -61.2537225],
        title: "Kalinago Council Office",
        description: "Administrative center of the Territory.",
        image: "kalinago-people-1.png",
        type: "culture"
      },
      {
        coords: [15.4920956, -61.2666399],
        title: "Horseback Ridge",
        description: "Amazing View point.",
        image: "kalinago-nature-1.png",
        type: "view"
      }
    ];

    let map = L.map('map').setView([15.4967852, -61.2572866], 13);

    const baseLayers = {
      "Carto Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CartoDB</a>'
      }),
      "OSM Standard": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      }),
      "Satellite": L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains:['mt0','mt1','mt2','mt3'],
        attribution: '&copy; <a href="https://www.google.com/">Google</a>'
      })
    };

    baseLayers["Carto Light"].addTo(map);
    L.control.layers(baseLayers).addTo(map);

    const kalinagoIcon = L.icon({
      iconUrl: 'assets/images/map/kalinago-marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const markerGroups = {
      culture: L.layerGroup(),
      food: L.layerGroup(),
      view: L.layerGroup()
    };

    markers.forEach(m => {
      const marker = L.marker(m.coords, { icon: kalinagoIcon })
        .bindPopup(`<b>${m.title}</b><br>${m.description}<br><img src='assets/images/gallery/${m.image}' width='100%' style='margin-top:10px;border-radius:6px;'/>`)
        .on('mouseover', function () { this.openPopup(); })
        .on('mouseout', function () { this.closePopup(); });

      markerGroups[m.type].addLayer(marker);
    });

    Object.values(markerGroups).forEach(group => group.addTo(map));
    L.control.layers(null, markerGroups, { collapsed: false }).addTo(map);

    let current = 0;
    function tourMarkers() {
      const m = markers[current];
      map.setView(m.coords, 15);
      L.popup()
        .setLatLng(m.coords)
        .setContent(`<b>${m.title}</b><br>${m.description}<br><img src='assets/images/gallery/${m.image}' width='100%' style='margin-top:10px;border-radius:6px;'/>`)
        .openOn(map);
      current = (current + 1) % markers.length;
    }
    tourMarkers();
    setInterval(tourMarkers, 7000);

    // Scroll animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    timelineItems.forEach(item => observer.observe(item));