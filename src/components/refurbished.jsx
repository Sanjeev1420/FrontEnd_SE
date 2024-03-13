import React from "react";
import { useSpring, animated } from "react-spring";


const Refurbished = ({ sidebarToggle }) => {
  const { marginLeft } = useSpring({
    marginLeft: sidebarToggle ? "15.4%" : "5%",
    config: { duration: 250 }
  });

  return (
    <animated.div className="refurbished-body" style={{ marginLeft: marginLeft }}>
      <h2>Refurbished</h2>
    </animated.div>
  );
};

export default Refurbished;
