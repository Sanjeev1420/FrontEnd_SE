import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSpring, animated } from "react-spring";
import Carousel from 'react-bootstrap/Carousel';
import { Image } from "react-bootstrap";

import '../stylesheets/home.css'
import poster1 from "../images/poster1.jpg";
import poster2 from "../images/poster2.jpg";
import poster3 from "../images/poster3.jpg";

const Home = ({ sidebarToggle }) => {
  const { marginLeft } = useSpring({
    marginLeft: sidebarToggle ? "15%" : "4.65%",
    config: { duration: 250 }
  });

  return (
    <animated.div className="home-body" style={{ marginLeft: marginLeft }}>
     <>
     <Carousel className="allPosters" style={{ width: '620px', height: '900px' }}>
      <Carousel.Item>
      <Image src={poster1} fluid />
     </Carousel.Item>
      <Carousel.Item>
      <Image src={poster2} fluid />
      </Carousel.Item>
      <Carousel.Item>
      <Image src={poster3} fluid />
      </Carousel.Item>
    </Carousel>
      
     </>
    </animated.div>
  );
};

export default Home;
