import React from "react";
import { useSpring, animated } from "react-spring";

import "../stylesheets/onlineShop.css"


const OnlineShop = ({ sidebarToggle }) => {
  const { marginLeft } = useSpring({
    marginLeft: sidebarToggle ? "15%" : "4.65%",
    config: { duration: 250 }
  });


  return (
    <animated.div className="onlineStore-body" style={{ marginLeft: marginLeft }}>
     <>
     <h2>Online Shop Page</h2>
     </>
    </animated.div>
  );
};

export default OnlineShop;
