import { useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import "../stylesheets/profile.css";
import EditUser from "./editUser";
import ProfileHome from "./profileHome";
import Address from "./address";

const Profile = ({ showProfile }) => {
  const [show, setShow] = useState(showProfile);

  return (
    <>
     <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="address">Address</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="order_pending">Order Pending</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="order_history">Order History</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                
                <Tab.Pane eventKey="profile">
                  <ProfileHome></ProfileHome>
                </Tab.Pane>

                <Tab.Pane eventKey="address">
                    <Address></Address>
                </Tab.Pane>

                <Tab.Pane eventKey="order_pending">
                  Order Pending Section
                </Tab.Pane>

                <Tab.Pane eventKey="order_history">
                  Order History Section
                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
    </Modal>


    <EditUser>

    </EditUser>
    </>
   
  );
};

export default Profile;
