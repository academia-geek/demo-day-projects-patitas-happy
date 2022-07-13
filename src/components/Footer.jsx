import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import "../Styles/LandingPage.css";
import React from "react";

const Footer = () => {
  return (
    <div className="containers">
      <div className="footer">
        <span>Home</span>
        <span>About</span>
        <span>Features</span>
        <span>Pricing</span>
        <span>Contact us</span>
      </div>

      <div className="footer">
        <span>Blog</span>
        <span>Search</span>
        <span>T & Cs</span>
        <span>Privacy</span>
        <span>Community</span>
      </div>

      <div className="footer">
        <h3>¡SIGUENOS!</h3>
        <div>
          <FacebookFilled />
          <InstagramFilled />
          <TwitterCircleFilled />
          <YoutubeFilled />
        </div>
      </div>
    </div>
  );
};

export default Footer;
