import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// air quality
var airmobility = new FeatureLayer({
  title: "Air Mobility",
  portalItem: {
    id: "f20e5dfce93b4467bd09d5122701ac8b",
  },
});


const AIRMOBILITY = [
  {
    layers: [airmobility]
  }
];

export default AIRMOBILITY;