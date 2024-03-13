import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../stylesheets/addressForm.css";
import locationPinIcon from "../images/locationPinIcon.png";
import { userAddressFormValidation } from "../utils/formValidation";
import MapModal from "./mapModal";

const AddressForm = (props) => {
  const { addressData, show, handleClose, handleSubmit } = props;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showMapModal, setShowMapModal] = useState(false);
  const [editLocation, setEditLocation] = useState({});

  useEffect(() => {
    setFormData(addressData);
  }, [addressData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleFormData = () => {
    const validationErrors = userAddressFormValidation({
      addressName: formData.addressName,
      doorNo: formData.doorNo,
      street: formData.street,
      townOrVillage: formData.townOrVillage,
      district: formData.district,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      geoLocation: formData.geoLocation,
    });
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const isEdit = Object.keys(addressData).length > 0 ? true : false;
    handleSubmit(formData, isEdit);
  };

  const handleMapModel = () => {
    if (formData?.geoLocation?.coordinates.length > 0) {
      setEditLocation({
        lat: formData.geoLocation.coordinates[0],
        lng: formData.geoLocation.coordinates[1],
      });
    } else {
      setEditLocation({});
    }
    setShowMapModal(true);
  };

  const handleMapModalClose = () => {
    setShowMapModal(false);
  };

  const handleSelectedLocation = (location) => {
    const { lat, lng } = location;
    const newGeoLocation = {
      type: "Point",
      coordinates: [lat, lng],
    };
    setFormData((prevData) => ({
      ...prevData,
      geoLocation: newGeoLocation,
    }));
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="offcanvas_addressForm"
        style={{ width: "30rem" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {Object.keys(addressData).length > 0
              ? "Edit Address"
              : "Add Address"}
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Address Name</Form.Label>
              <Form.Control
                type="text"
                name="addressName"
                onChange={(e) => handleChange(e)}
                value={formData.addressName || ""}
              />
              {errors.addressName && (
                <Form.Text className="text-danger">
                  {errors.addressName}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Door No</Form.Label>
              <Form.Control
                type="text"
                name="doorNo"
                onChange={(e) => handleChange(e)}
                value={formData.doorNo || ""}
              />
              {errors.doorNo && (
                <Form.Text className="text-danger">{errors.doorNo}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                onChange={(e) => handleChange(e)}
                value={formData.street || ""}
              />
              {errors.street && (
                <Form.Text className="text-danger">{errors.street}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Town or Village</Form.Label>
              <Form.Control
                type="text"
                name="townOrVillage"
                onChange={(e) => handleChange(e)}
                value={formData.townOrVillage || ""}
              />
              {errors.townOrVillage && (
                <Form.Text className="text-danger">
                  {errors.townOrVillage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                name="district"
                onChange={(e) => handleChange(e)}
                value={formData.district || ""}
              />
              {errors.district && (
                <Form.Text className="text-danger">{errors.district}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                onChange={(e) => handleChange(e)}
                value={formData.state || ""}
              />
              {errors.state && (
                <Form.Text className="text-danger">{errors.state}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                onChange={(e) => handleChange(e)}
                value={formData.country || ""}
              />
              {errors.country && (
                <Form.Text className="text-danger">{errors.country}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                onChange={(e) => handleChange(e)}
                value={formData.pincode || ""}
              />
              {errors.pincode && (
                <Form.Text className="text-danger">{errors.pincode}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="md-3">
              <InputGroup className="mb-3">
                <InputGroup.Text className="locationFieldIcon">
                  <Image
                    src={locationPinIcon}
                    className="locationPinIcon"
                    onClick={() => handleMapModel()}
                  />
                </InputGroup.Text>
                <Form.Control
                  aria-label="Latitude"
                  type="text"
                  name="latitude"
                  value={
                    formData?.geoLocation?.coordinates.length > 0
                      ? formData.geoLocation.coordinates[0] || ""
                      : ""
                  }
                />
                <Form.Control
                  aria-label="Longitude"
                  type="text"
                  name="longitude"
                  value={
                    formData?.geoLocation?.coordinates.length > 0
                      ? formData?.geoLocation.coordinates[1] || ""
                      : ""
                  }
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Offcanvas.Body>

        <div className="offcanvas-footer">
          <Button
            className="saveButton"
            variant="primary"
            onClick={handleFormData}
          >
            Save
          </Button>
        </div>
      </Offcanvas>

      <MapModal
        currentLocation={editLocation}
        show={showMapModal}
        handleClose={handleMapModalClose}
        handleSelectedLocation={handleSelectedLocation}
      />
    </>
  );
};

export default AddressForm;
