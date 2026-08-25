
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';

function LocationMarker({ position, onPositionChange }) {
  useMapEvents({
    click(e) {
      const newPos = [e.latlng.lat, e.latlng.lng];
      onPositionChange(newPos, true);
    },
  });
  
  const handleDragEnd = (e) => {
    const newPos = e.target.getLatLng();
    onPositionChange([newPos.lat, newPos.lng], true);
  };

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{ dragend: handleDragEnd }}
    />
  ) : null;
}

// Recenters the map whenever position changes programmatically (IP/GPS lookup),
// but not when the user drags/clicks the marker themselves.
function RecenterOnChange({ position, shouldRecenter }) {
  const map = useMap();
  useEffect(() => {
    if (position && shouldRecenter.current) {
      map.setView(position, map.getZoom());
    }
  }, [position, map, shouldRecenter]);
  return null;
}

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Locating you…');
  const userHasMovedRef = useRef(false);
  const shouldRecenterRef = useRef(true);
  console.log(position);
 
  // ==================== IP-BASED LOCATION (fast, approximate, no permission needed) ====================
  const fetchIPLocation = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/'); // HTTPS-safe, free tier
      const data = await res.json();

      if (data.latitude && data.longitude && !userHasMovedRef.current) {
        const newPos = [data.latitude, data.longitude];
        shouldRecenterRef.current = true;
        setPosition(newPos);
        onLocationSelect(data.latitude, data.longitude);
        setStatusMessage('Approximate location loaded — refining with GPS…');
      }
    } catch (err) {
      console.error('IP location failed', err);
      setStatusMessage('Could not auto-detect location. Drag the marker to set it.');
    }
  };

  // ==================== BROWSER GEOLOCATION (precise, triggers permission prompt) ====================
  const requestBrowserLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (userHasMovedRef.current) return; // don't clobber a manual pin
        const newPos = [pos.coords.latitude, pos.coords.longitude];
        shouldRecenterRef.current = true;
        setPosition(newPos);
        onLocationSelect(pos.coords.latitude, pos.coords.longitude);
        setStatusMessage('Using your precise location.');
      },
      (err) => {
        console.warn('Geolocation permission denied or unavailable', err);
        // Keep whatever we already have (IP location or default) — no error shown to user
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // On mount: show IP location immediately, then ask for precise permission right away
  useEffect(() => {
    fetchIPLocation();
    requestBrowserLocation();
  }, []);

  const handlePositionChange = (newPos, isUserAction = false) => {
    shouldRecenterRef.current = false; // user moved it — don't snap the view back
    setPosition(newPos);
    onLocationSelect(newPos[0], newPos[1]);

    if (isUserAction) {
      userHasMovedRef.current = true;
      setStatusMessage('Custom location set.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <button onClick={requestBrowserLocation} style={{ marginRight: '8px' }}>
          📍 Use Precise GPS Location
        </button>
        <button onClick={() => { userHasMovedRef.current = false; fetchIPLocation(); }}>
          🌐 Reset to IP Location
        </button>
      </div>

      <MapContainer
        center={position || [20.5937, 78.9629]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        <LocationMarker
          position={position}
          onPositionChange={handlePositionChange}
        />
        <RecenterOnChange position={position} shouldRecenter={shouldRecenterRef} />
      </MapContainer>

      {position && (
        <p style={{ marginTop: '10px', fontSize: '0.95rem' }}>
          {statusMessage}<br />
          📍 {position[0].toFixed(5)}, {position[1].toFixed(5)}<br />
          <strong>Drag the marker or click anywhere on the map to change delivery location</strong>
        </p>
      )}
    </div>
  );
};

export default LocationPicker;