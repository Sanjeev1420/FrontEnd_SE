import React, { useState} from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

import "../stylesheets/editUser.css";
import { userEditFormValidation } from "../utils/formValidation";

const EditUser = (props) => {
  const { userData, show, handleClose, handleSubmit } = props;
  const [formData, setFormData] = useState(userData || {});
  const [errors, setErrors] = useState({});
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleFormData = () => {
    const validationErrors = userEditFormValidation({
        firstName : formData.firstName,
        lastName : formData.lastName,
        email : formData.email,
        mobileNumber : formData.mobileNumber,
        preferedLanguage : formData.preferedLanguage,
        theme : formData.theme
    });
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    handleSubmit(formData);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "35rem" }}
      className="offcanvas_userEditForm"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Profile</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              onChange={(e) => handleChange(e)}
              value={formData.firstName}
            />
            {errors.firstName && (
              <Form.Text className="text-danger">{errors.firstName}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              onChange={(e) => handleChange(e)}
              value={formData.lastName}
            />
            {errors.lastName && (
              <Form.Text className="text-danger">{errors.lastName}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="text"
              name="email"
              onChange={(e) => handleChange(e)}
              value={formData.email}
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile Number </Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              onChange={(e) => handleChange(e)}
              value={formData.mobileNumber}
            />
            {errors.mobileNumber && (
              <Form.Text className="text-danger">
                {errors.mobileNumber}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Select
              name="preferedLanguage"
              onChange={(e) => handleChange(e)}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ta">Tamil</option>
              <option value="hi">Hindi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Theme</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Light"
                name="theme"
                value="light"
                checked={formData.theme === "light"}
                onChange={(e) => handleChange(e)}
              />
              <Form.Check
                inline
                type="radio"
                label="Dark"
                name="theme"
                value="dark"
                checked={formData.theme === "dark"}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Form.Group>
        </Form>
      </Offcanvas.Body>
      
      <div className="offcanvas-footer">
        <Button className="saveButton" variant="primary" onClick={handleFormData}>
          Save
        </Button>
      </div>
    </Offcanvas>
  );
};

export default EditUser;
