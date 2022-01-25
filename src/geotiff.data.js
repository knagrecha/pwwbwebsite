import TileLayer from "@arcgis/core/layers/TileLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import GroupLayer from "@arcgis/core/layers/GroupLayer";

var alltimes = new FeatureLayer({
  title: "Pollution",
  portalItem: {
    id:"e72aa8c2fb104acd9d042a0999c5e2f3",
  },
});


const GEOTIFF_DATA = [
  {
    id: 1,
    layers: [alltimes],
    
  }
]; export default GEOTIFF_DATA
