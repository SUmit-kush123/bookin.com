import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { useTheme } from '../contexts/ThemeProvider';

interface MapMarker {
  position: LatLngExpression;
  popupContent: string; // Now accepts raw HTML string
}

interface MapComponentProps {
  center: LatLngExpression;
  zoom: number;
  markers: MapMarker[];
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, markers, className }) => {
  const { theme } = useTheme();
  const isDark = theme.includes('dark');

  const tileUrl = isDark 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
  const attribution = isDark
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className={className || 'h-full w-full'}>
      <TileLayer
        attribution={attribution}
        url={tileUrl}
      />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker.position}>
          <Popup>
             <div dangerouslySetInnerHTML={{ __html: marker.popupContent }} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;