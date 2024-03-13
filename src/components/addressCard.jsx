import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../stylesheets/addressCard.css";

const AddressCard = (props) => {
  const { adrs, handleEditBtn, handleDeleteBtn } = props;
  const user = useSelector((state) => state.user);
  const theme = user.userData.theme;
  return (
    <>
      <Col>
        <Card key={adrs._id} className="addressCard">
          <Card.Header as="h5" className={`addressCardHeader-${theme}`}>
            {adrs.addressName}
          </Card.Header>
          <Card.Body className={`addressCardBody-${theme}`}>
            <Card.Text className={`addressCardText-${theme}`}>
              {adrs.doorNo}/{" " + adrs.street + " "},
              {" " + adrs.townOrVillage + " "},{" " + adrs.district + " "},
              {" " + adrs.state + " "},{" " + adrs.country + " "},
              {" " + adrs.pincode}.
            </Card.Text>
            <hr></hr>
            <div className={`addressCardBtns-${theme}`}>
              <Button
                variant="light"
                className="addressCardEditBtn"
                onClick={() => handleEditBtn(adrs)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="addressCardDeleteBtn"
                onClick={() => handleDeleteBtn(adrs._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default AddressCard;
