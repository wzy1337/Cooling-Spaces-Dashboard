import {GeolocateControl, Map, Popup, setWorkerUrl} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import hawkerCentresUrl from '../Dataset/Raw/hawkercenters.geojson?url';

setWorkerUrl(workerUrl);

let hawkerPopup;

const map = new Map({
    container: 'map', // container id #HTML Element
    style: 'https://tiles.openfreemap.org/styles/bright', // style URL
    center: [103.851959, 1.290270], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.on('load', () => {
    map.addSource('hawker-centres', {
        type: 'geojson',
        data: hawkerCentresUrl
    });

    map.addLayer({
        id: 'hawker-centres',
        type: 'circle',
        source: 'hawker-centres',
        paint: {
            'circle-radius': 10,
            'circle-color': 'rgb(250, 99, 12)',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    map.addLayer({
        id: 'hawker-centres-symbol',
        type: 'symbol',
        source: 'hawker-centres',
        layout: {
            'text-field': '🍴',
            'text-size': 10,
            'text-allow-overlap': true
        }
    });

    map.on('mouseenter', 'hawker-centres', (event) => {
        map.getCanvas().style.cursor = 'pointer';

        const feature = event.features?.[0];
        if (!feature || feature.geometry.type !== 'Point') {
            return;
        }

        hawkerPopup = new Popup()
            .setLngLat(feature.geometry.coordinates)
            .setText(feature.properties?.NAME ?? 'Hawker centre')
            .addTo(map);
    });

    map.on('mouseleave', 'hawker-centres', () => {
        map.getCanvas().style.cursor = '';
        hawkerPopup?.remove();
    });
});

map.addControl(
    new GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    }),
    'top-right'
);
