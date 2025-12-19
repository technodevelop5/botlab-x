import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import countriesData from '../data/countries.json';

// 🔹 بيانات surveys (مثال)
const surveyPoints = [
  { id: 1, country: "USA", lat: 37.7749, lng: -122.4194, count: 120 },
  { id: 2, country: "Germany", lat: 52.52, lng: 13.405, count: 75 },
  { id: 3, country: "UK", lat: 51.5072, lng: -0.1276, count: 90 },
  { id: 4, country: "France", lat: 48.8566, lng: 2.3522, count: 60 },
  { id: 5, country: "Japan", lat: 35.6895, lng: 139.6917, count: 110 },
];

// 🔹 Heatmap Component
function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    const heatData = points.map(p => [p.lat, p.lng, p.count]);
    const heat = L.heatLayer(heatData, {
      radius: 30,
      blur: 25,
      maxZoom: 6,
      gradient: {
        0.2: '#93c5fd',
        0.4: '#60a5fa',
        0.6: '#2563eb',
        0.8: '#1e40af',
        1.0: '#1e3a8a',
      },
    }).addTo(map);

    return () => map.removeLayer(heat);
  }, [map, points]);

  return null;
}

export default function PolygonMap() {
  const geojsonRef = useRef();

  // 🎨 تلوين الدولة حسب القيمة
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
    fillOpacity: 0.5
  });

  const onEachFeature = (feature, layer) => {
    layer.bindTooltip(`${feature.properties.name}: ${feature.properties.value || 0}`);
  };

  // 🔴 حجم النقطة حسب عدد surveys
  const getRadius = (count) => {
    if (count > 100) return 20;
    if (count > 80) return 16;
    if (count > 60) return 13;
    if (count > 40) return 10;
    return 7;
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* 🗺️ الدول */}
      <GeoJSON
        ref={geojsonRef}
        data={countriesData}
        style={style}
        onEachFeature={onEachFeature}
      />

      {/* 🔥 Heatmap */}
      <HeatmapLayer points={surveyPoints} />

      {/* 📍 نقاط Bubble */}
      {surveyPoints.map(point => (
        <CircleMarker
          key={point.id}
          center={[point.lat, point.lng]}
          radius={getRadius(point.count)}
          fillColor="#2563eb"
          color="#1e40af"
          weight={1}
          fillOpacity={0.75}
        >
          <Popup>
            <strong>{point.country}</strong><br />
            Survey Responses: {point.count}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
