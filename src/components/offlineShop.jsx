import React from "react";
import { useSpring, animated } from "react-spring";


const Stores = ({ sidebarToggle }) => {
  const { marginLeft } = useSpring({
    marginLeft: sidebarToggle ? "15.4%" : "5%",
    config: { duration: 250 }
  });


  return (
    <animated.div className="stores-body" style={{ marginLeft: marginLeft }}>
      <h2>Stores Page</h2>
    </animated.div>
  );
};

export default Stores;
