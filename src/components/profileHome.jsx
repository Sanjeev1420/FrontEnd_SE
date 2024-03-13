import "../stylesheets/profileHome.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Badge, Button, Stack } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import toast, { Toaster } from "react-hot-toast";

import { getLanguageByCode } from "../utils/i18n/i18nUtils";
import { http, host } from "../utils/httpServices";
import profile_defaultImage from "../images/profile_defaultImage.png";
import theme_profileDarkIcon from "../images/theme_profileDarkIcon.png";
import theme_profileLightIcon from "../images/theme_profileLightIcon.png";
import EditUser from "./editUser";
import { updateUser } from "../redux/reducers/user";
import { useSwitchTheme } from "../hooks/theme";

const ProfileHome = () => {
  const user = useSelector((state) => state.user);
  const userData = user.userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const switchTheme = useSwitchTheme();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [editUserData, setEditUserData] = useState(userData);

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => {
    setEditUserData({});
    setShowOffcanvas(false);
  };

  const updateUserData = async (formData) => {
    try {
      const res = await http.put(
        `${host}/user/updateUser`,
        formData,
        user.token
      );
      toast.success(res.data.message);
      dispatch(updateUser(res.data.user));
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      if (error.response.status === 402) {
        dispatch({ type: "RESET_STORE" });
        navigate("/login", { state: { showModel: true } });
      }
    } finally {
      handleCloseOffcanvas();
    }
  };

  return (
    <>
      <Toaster />
      <Container>
        <Row className="profile_buttons">
          <Col>
            <Image
              src={profile_defaultImage}
              className="profile_image"
              roundedCircle
            />
          </Col>
          <Col>
            <Button
              variant="outline-info"
              className="profile_editButton"
              onClick={() => handleShowOffcanvas()}
            >
              Edit Profile
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>{`${userData.firstName}  ${userData.lastName}`}</Col>
        </Row>
        <Row>
          <Col>{`${userData.email}`}</Col>
        </Row>
        <Row>
          <Col>{`${userData.mobileNumber}`}</Col>
        </Row>
        <Row>
          <Col>
            <p>Language : {getLanguageByCode(userData.preferedLanguage)}</p>
          </Col>
        </Row>
        <Row>
          <p>Theme </p>
        </Row>
        <Row>
          <Stack direction="horizontal" className="theme_stack" gap={2}>
            <Badge
              bg="light"
              className={`theme_badge text-dark ${
                userData.theme === "light" ? "badge_border" : ""
              }`}
              onClick={() => switchTheme()}
            >
              <Image
                src={theme_profileLightIcon}
                className={
                  userData.theme === "light"
                    ? "theme_profileIcon "
                    : "theme_profileIcon"
                }
              />
              Light
            </Badge>
            <Badge
              bg="dark"
              className={`theme_badge ${
                userData.theme === "dark" ? "badge_border" : ""
              }`}
              onClick={() => switchTheme()}
            >
              <Image
                src={theme_profileDarkIcon}
                className={
                  userData.theme === "dark"
                    ? "theme_profileIcon"
                    : "theme_profileIcon"
                }
              />
              Dark
            </Badge>
          </Stack>
        </Row>
      </Container>

      <EditUser
        userData={editUserData}
        show={showOffcanvas}
        handleClose={handleCloseOffcanvas}
        handleSubmit={updateUserData}
      />
    </>
  );
};

export default ProfileHome;
