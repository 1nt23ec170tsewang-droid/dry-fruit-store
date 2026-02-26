import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const DeliveryMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Ladakh
    const map = L.map(mapRef.current).setView([34.1526, 77.5770], 7);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Delivery areas with coordinates and delivery times
    const deliveryAreas = [
      { name: 'Leh', lat: 34.1526, lng: 77.5770, days: '1-2' },
      { name: 'Kargil', lat: 34.5577, lng: 76.1262, days: '2-3' },
      { name: 'Nubra', lat: 34.6333, lng: 77.4167, days: '3-4' },
      { name: 'Zanskar', lat: 33.6333, lng: 76.8333, days: '4-5' },
      { name: 'Nyoma', lat: 33.2000, lng: 78.6500, days: '4-5' },
      { name: 'Changthang', lat: 33.5000, lng: 78.5000, days: '5-6' },
    ];

    // Add markers for each delivery area
    deliveryAreas.forEach((area) => {
      const marker = L.marker([area.lat, area.lng]).addTo(map);
      marker.bindPopup(
        `<strong>${area.name}</strong><br/>Delivery available – Estimated ${area.days} days.`
      );
    });

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border-2 border-ladakh-orange">
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default DeliveryMap;

