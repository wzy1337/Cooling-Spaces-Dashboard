import {Map, setWorkerUrl} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import hawkerCentresUrl from '../Dataset/Raw/hawkercenters.geojson?url';

setWorkerUrl(workerUrl);

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
            'circle-radius': 6,
            'circle-color': 'rgb(250, 12, 12)'
        }
    });
});

