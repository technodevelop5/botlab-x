import React, { useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from '../data/countries.json'; // ملف GeoJSON

export default function PolygonMap() {
  const geojsonRef = useRef();

  // دالة تلوين الدولة حسب القيمة
  const getColor = (value) => {
    return value > 100 ? '#800026' :
           value > 50  ? '#BD0026' :
           value > 20  ? '#E31A1C' :
           value > 10  ? '#FC4E2A' :
           value > 5   ? '#FD8D3C' :
                         '#FEB24C';
  };

  const style = (feature) => ({
    fillColor: getColor(feature.properties.value || 0),
    weight: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  });

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 2,
          color: '#666',
          fillOpacity: 0.9
        });
      },
      mouseout: (e) => {
        geojsonRef.current.resetStyle(e.target);
      },
      click: (e) => {
        alert(`الدولة: ${feature.properties.name}\nالقيمة: ${feature.properties.value}`);
      }
    });
    layer.bindTooltip(`${feature.properties.name}: ${feature.properties.value}`);
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <GeoJSON
        ref={geojsonRef}
        data={countriesData}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
}
