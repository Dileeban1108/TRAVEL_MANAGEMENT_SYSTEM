import React from "react";
import "../styles/footer.css";
import { FaFacebook, FaInstagram ,FaPhone } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content">
        <div className="footer__section">
          <h5 className="footer__heading">Travel Mgt System</h5>
          <p>
            Empower minds and embrace  with Travel Management Syatem. Join us in shaping the future of traveling!
          </p>
        </div>
        

        <div className="container_1">
          <h5 className="footer__heading">Contact Us</h5>
          <ul className="icons-list">
            <NavLink to="">
              <FaFacebook />
            </NavLink>
            <NavLink to="">
              <FaInstagram />
            </NavLink>
            or
            <NavLink to="">
              <FaPhone />:+94 76 756 6677
            </NavLink>

          </ul>
        </div>
      </section>

      <div className="footer__copyright">
        &copy; {new Date().getFullYear()} All Rights Reserved!
      </div>
    </footer>
  );
};

export default Footer;
