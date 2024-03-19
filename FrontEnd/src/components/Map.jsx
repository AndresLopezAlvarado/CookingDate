import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ latitude, longitude, pet }) => {
  useEffect(() => {
    let map = null;

    const initializeMap = () => {
      map = L.map("map").setView([latitude, longitude], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`Ubicación de ${pet.name}`)
        .openPopup();
    };

    if (!map) {
      initializeMap();
    } else {
      map.off();
      map.remove();
      initializeMap();
    }

    return () => {
      map && map.remove();
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ height: "300px", width: "500px", borderRadius: "6px" }}></div>;
};

export default Map;
