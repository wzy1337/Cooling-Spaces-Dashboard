import {Map, setWorkerUrl} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

setWorkerUrl(workerUrl);

// Import map class
const map = new Map({
    container: 'map', // container id #HTML Element
    style: 'https://tiles.openfreemap.org/styles/bright', // style URL
    center: [103.851959, 1.290270], // starting position [lng, lat]
    zoom: 10.5 // starting zoom
});