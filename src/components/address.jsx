import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button, Badge } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../stylesheets/address.css";
import AddressCard from "./addressCard";
import AddressForm from "./addressForm";
import { http, host } from "../utils/httpServices";
import { updateUser } from "../redux/reducers/user";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const userData = user.userData;
  const token = user.token;
  const theme = userData.theme;
  const address = userData.address;

  const [editAddressData, setEditAddressData] = useState({});
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => {
    // setEditUserData({});
    setShowOffcanvas(false);
  };

  const handleAddAddressBtn = () => {
    setEditAddressData({});
    setShowOffcanvas(true);
  };

  const handleEditBtn = (adrsData) => {
    setEditAddressData(adrsData);
    setShowOffcanvas(true);
  };

  const handleDeleteBtn = async (addressId) => {
    const body = {
      userId: userData._id,
      addressId,
    };
    const url =
      `${host}/user/deleteUserAddress` +
      `?userId=${body.userId}&addressId=${body.addressId}`;
    try {
      let res = await http.delete(url, token);
      dispatch(updateUser(res.data.user));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      if (error.response.status === 402) {
        dispatch({ type: "RESET_STORE" });
        navigate("/login", { state: { showModel: true } });
      }
    }
  };

  const submitFormData = async (formData, isEdit) => {
    if (!isEdit) {
      formData._id = userData._id;
      console.log(formData);
      try {
        let res = await http.post(
          `${host}/user/addUserAddress`,
          formData,
          token
        );
        dispatch(updateUser(res.data.user));
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message || error.message);
        if (error.response.status === 402) {
          dispatch({ type: "RESET_STORE" });
          navigate("/login", { state: { showModel: true } });
        }
      }
    } else {
      formData.userId = userData._id;
      console.log(formData);
      try {
        let res = await http.put(
          `${host}/user/updateUserAddress`,
          formData,
          token
        );
        dispatch(updateUser(res.data.user));
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message || error.message);
        if (error.response.status === 402) {
          dispatch({ type: "RESET_STORE" });
          navigate("/login", { state: { showModel: true } });
        }
      }
    }
  };

  return (
    <>
      <Toaster />
      <Container>
        <Row>
          <Col>
            <Button
              variant="info"
              className="addAddressBtn"
              onClick={() => handleAddAddressBtn()}
            >
              Add Address
            </Button>
          </Col>
        </Row>

        <Row xs={1} md={2} className="g-4 mt-2 mb-4">
          {address.length > 0 ? (
            address.map((addressDetails) => (
              <AddressCard
                adrs={addressDetails}
                handleEditBtn={handleEditBtn}
                handleDeleteBtn={handleDeleteBtn}
              />
            ))
          ) : (
            <Badge className={`noAddressBadge-${theme}`}>
              {" "}
              No address added yet!{" "}
            </Badge>
          )}
        </Row>
      </Container>

      <div>
        <AddressForm
          addressData={editAddressData}
          show={showOffcanvas}
          handleClose={handleCloseOffcanvas}
          handleSubmit={submitFormData}
        ></AddressForm>
      </div>
    </>
  );
};

export default Address;
