/**
 * stationtopoint
 *
 */
'use strict';

const helper = require('./../share/helper');

const path = require('path');

const outputFolder = 'output';
const dataFileName = 'mvgStations.geojson';

process.stdin.resume();
process.stdin.setEncoding('utf8');

let input = '';
process.stdin.on('data', function(chunk) {
  input = input + chunk;
});

process.stdin.on('end', function() {

  const json = JSON.parse(input);
  if (json.constructor != Array) {
    console.log('ERROR: process.stdin.on, json is no array');
    return;
  }

  const output = {
    type: 'FeatureCollection',
    features: json.map(stationToGeojsonFeature)
  };

  const outputPath = path.join(outputFolder, dataFileName);

  helper.createDirectory(outputFolder);
  helper.writeJsonFile(outputPath, output);

  console.log('INFO: preprocess, Done!');
});

const stationToGeojsonFeature = function(station) {
  const geojsonFeature = {
    type: 'Feature',
    geometry: station.loc,
    properties: {
      id: station.id,
      stationId: station.stationId,
      stationName: station.additionalData.stationName,
      provider: station.additionalData.provider,
      // district: station.additionalData.district,
      firstAppearanceDate: station.firstAppearanceDate,
      lastAppearanceDate: station.lastAppearanceDate
    }
  };

  return geojsonFeature;
};
