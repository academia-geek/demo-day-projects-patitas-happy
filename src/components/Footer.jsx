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
    <div className="containers" style={{padding:'150px 0'}}>
      <div className="footer">
        <span style={{margin:'7px 0'}}>Home</span>
        <span style={{margin:'7px 0'}}>About</span>
        <span style={{margin:'7px 0'}}>Features</span>
        <span style={{margin:'7px 0'}}>Pricing</span>
        <span style={{margin:'7px 0'}}>Contact us</span>
      </div>

      <div className="footer">
        <span style={{margin:'7px 0'}}>Blog</span>
        <span style={{margin:'7px 0'}}>Search</span>
        <span style={{margin:'7px 0'}}>T & Cs</span>
        <span style={{margin:'7px 0'}}>Privacy</span>
        <span style={{margin:'7px 0'}}>Community</span>
      </div>

      <div className="footer">
        <h3 style={{fontWeight:'regular'}}>¡SIGUENOS!</h3>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
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
