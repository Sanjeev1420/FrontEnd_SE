import React, { useEffect, useState } from "react";
import { useMap , TileLayer, Marker, Popup, MapContainer, useMapEvents } from "react-leaflet";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "leaflet/dist/leaflet.css";

import "../stylesheets/mapModal.css";

const MapModal = (props) => {
  const { currentLocation, show, handleClose, handleSelectedLocation } = props;
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (currentLocation && Object.keys(currentLocation).length > 0) {
      setSelectedLocation(currentLocation);
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      } else {
        toast.error("Geolocation is not supported by your browser");
      }
    }
  }, [currentLocation]);

  const handleOk = () => {
    if (selectedLocation) {
      handleSelectedLocation(selectedLocation);
    }
    handleClose();
  };

  return (
    <>
    <Toaster/>
      <Modal show={show} onHide={handleClose} size="lg" className="mapModal">
        <Modal.Header closeButton>
          <Modal.Title>Select Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLocation && (
            <MapContainer
              center={[selectedLocation.lat, selectedLocation.lng]}
              zoom={15}
              style={{ height: "400px", width: "100%" }}
              scrollWheelZoom={false}
            >
              <CustomMapEvents setSelectedLocation={setSelectedLocation} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <CustomMarker selectedLocation={selectedLocation} />
            </MapContainer>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const CustomMapEvents = ({ setSelectedLocation }) => {
  const map = useMapEvents({
    click(e) {
      const roundedLatLng = {
        lat: parseFloat(e.latlng.lat.toFixed(6)),
        lng: parseFloat(e.latlng.lng.toFixed(6)),
      };
      setSelectedLocation(roundedLatLng);
    },
});

  return null; // This component doesn't render anything, it just sets up the map events
};

const CustomMarker = ({ selectedLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng]);
    }
  }, [selectedLocation, map]);

  return selectedLocation ? (
    <Marker position={selectedLocation}>
      <Popup>You selected this location</Popup>
    </Marker>
  ) : null;
};


export default MapModal;
