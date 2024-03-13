import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";


import "../stylesheets/sidebar.css";
import sidebararrrow from "../images/sideBarArrow.png";
import { useSwitchTheme } from "../hooks/theme";


const SideBar = ({ sidebarToggle, setSidebarToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggle = () => {
    setSidebarToggle((prevState) => !prevState);
  };
  const user = useSelector((state) => state.user);
  const isLogedIn = user.token !== null;
  const userName = isLogedIn ? `${user.userData.firstName}` : null;
  const isDarkMode = isLogedIn ? (user.userData.theme=== 'dark' ? true : false ) : false;
  const { left } = useSpring({
    from: { left: "-20%" },
    to: { left: sidebarToggle ? "0" : "-10.4%" },
  });
  const switchTheme = useSwitchTheme();
  const handleLogOut = () => {
    dispatch({type : 'RESET_STORE'})
  }

  
  return (
    <animated.div
      className={
        isDarkMode
          ? `Sidebar-dark`
          : `Sidebar-light` 
      }
      style={{ left: left }}
    >
      <animated.img
        src={sidebararrrow}
        className="arrowIcon"
        style={{ transform: sidebarToggle ? "scaleX(-1)" : "scaleX(1)" }}
        alt="Sidebar Arrow"
        onClick={() => handleToggle()}
      />

      <div>
        <Nav className="tabs">
          <Nav.Link className="nav-items tab" onClick={() => navigate("/")}>
            Home
          </Nav.Link>
          <Nav.Link
            className="nav-items tab"
            onClick={() => navigate("/online")}
          >
            Online Shop
          </Nav.Link>
          <Nav.Link
            className="nav-items tab"
            onClick={() => navigate("/stores")}
          >
            Offline Shop
          </Nav.Link>
          <Nav.Link
            className="nav-items tab"
            onClick={() => navigate("/refurbished")}
          >
            Refurbished
          </Nav.Link>
        </Nav>

        <Nav className="bottom-tabs">
          {isLogedIn ? (
            <>
              <Nav.Link
                className="nav-items tab"
                onClick={() => navigate("/profile")}
              >
              {userName}
              </Nav.Link>
              <Nav.Link className="nav-items tab" onClick={() => handleLogOut()}>
                Log Out
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                className="nav-items tab"
                onClick={() => navigate("/signin" , {state : { showModel : true }})}
              >
                SignUp
              </Nav.Link>
              <Nav.Link
                className="nav-items tab"
                onClick={() => navigate("/login" ,  {state : { showModel : true }})}
              >
                LogIn
              </Nav.Link>
            </>
          )}

          <div className="theme-toggle tab" onClick={() => switchTheme()}>
            <span>Dark Theme</span>
          </div>
        </Nav>
      </div>
    </animated.div>

  );
};

export default SideBar;
