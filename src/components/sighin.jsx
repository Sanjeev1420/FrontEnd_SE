import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import { validateSignInForm } from "../utils/formValidation";
import { http, host } from "../utils/httpServices";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showModel = location.state;
  const [show, setShow] = useState(showModel);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleSubmit = async () => {
    try {
      const validationErrors = validateSignInForm(formData);
      if (validationErrors) {
        setErrors(validationErrors);
        return;
      } else {
        let res = await http.post(`${host}/user/signin`, formData);
        toast.success(res.data.message);
        navigate("/login" ,{state : { showModel : true }});
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <>
     <Toaster />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                name="firstName"
                onChange={(e) => handleChange(e)}
                autoFocus
              />
              {errors.firstName && (
                <Form.Text className="text-danger">
                  {errors.firstName}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                name="lastName"
                onChange={(e) => handleChange(e)}
              />
              {errors.lastName && (
                <Form.Text className="text-danger">{errors.lastName}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="minimum of length 5"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              {errors.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                name="mobileNumber"
                onChange={(e) => handleChange(e)}
              />
              {errors.mobileNumber && (
                <Form.Text className="text-danger">
                  {errors.mobileNumber}
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            SignUp
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignIn;
