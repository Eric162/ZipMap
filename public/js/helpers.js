function createGeoJsonObject(data) {
    return {
        data: {
            type: "FeatureCollection",
            features: [data]
        }
    };
};

if(typeof exports !== 'undefined') {
    exports.createGeoJsonObject = createGeoJsonObject;
}
