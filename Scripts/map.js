import {Map} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Import map class
const map = new Map({
    container: 'map', // container id #HTML Element
    style: 'https://demotiles.maplibre.org/globe.json', // style URL
    center: [1.2897, 103.8501], // starting position [lng, lat]
    zoom: 1 // starting zoom
});