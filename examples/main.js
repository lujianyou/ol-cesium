/**
 * @module examples.main
 */
const exports = {};
/* eslint googshift/valid-provide-and-module: 0 */
import olcsOLCesium from 'olcs/OLCesium.js';
import * as olProj from 'ol/proj.js';
import olView from 'ol/View.js';
import olControl from 'ol/control.js';
import olSourceOSM from 'ol/source/OSM.js';
import olLayerTile from 'ol/layer/Tile.js';
import olMap from 'ol/Map.js';


const ol2d = new olMap({
  layers: [
    new olLayerTile({
      source: new olSourceOSM()
    })
  ],
  controls: olControl.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  target: 'map',
  view: new olView({
    center: olProj.transform([25, 20], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3
  })
});

const timeElt = document.getElementById('time');
const ol3d = new olcsOLCesium({
  map: ol2d,
  time() {
    const val = timeElt.value;
    if (ol3d.getCesiumScene().globe.enableLighting && val) {
      const d = new Date();
      d.setUTCHours(val);
      return Cesium.JulianDate.fromDate(d);
    }
    return Cesium.JulianDate.now();
  }
});
const scene = ol3d.getCesiumScene();
const terrainProvider = new Cesium.CesiumTerrainProvider({
  url: '//assets.agi.com/stk-terrain/world',
  requestVertexNormals: true
});
scene.terrainProvider = terrainProvider;
ol3d.setEnabled(true);


timeElt.style.display = 'none';
const toggleTime = function() { // eslint-disable-line no-unused-vars
  scene.globe.enableLighting = !scene.globe.enableLighting;
  if (timeElt.style.display == 'none') {
    timeElt.style.display = 'inline-block';
  } else {
    timeElt.style.display = 'none';
  }
};


export default exports;
