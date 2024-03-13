import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import { validateLogInForm } from "../utils/formValidation";
import { http, host } from "../utils/httpServices";
import { setToken , setUser } from "../redux/reducers/user";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = validateLogInForm(formData);
      if (validationErrors) {
        setErrors(validationErrors);
        return;
      } else {
        let res = await http.post(`${host}/user/login`, formData);
        console.log(res);
        toast.success(res.data.message)
        dispatch(setToken({token : res.data.token}));
        dispatch(setUser({user : res.data.user}));
        navigate('/home')
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
          <Modal.Title>LogIn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                name="password"
                onChange={(e) => handleChange(e)}
              />
              {errors.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            LogIn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogIn;
