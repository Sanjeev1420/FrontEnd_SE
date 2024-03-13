import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSpring, animated } from "react-spring";
import '../stylesheets/home.css'

const Home = ({ sidebarToggle }) => {
  const { marginLeft } = useSpring({
    marginLeft: sidebarToggle ? "15.4%" : "5%",
    config: { duration: 250 }
  });

  return (
    <animated.div className="home-body" style={{ marginLeft: marginLeft }}>
      <h2>Home Page</h2>
    </animated.div>
  );
};

export default Home;
