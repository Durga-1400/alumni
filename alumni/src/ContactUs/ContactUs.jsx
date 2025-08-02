import React from "react";
import "./ContactUs.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-info">
        <h3>Contact Information</h3>
        
        {/* Contact Address */}
        <div className="contact-item">
          <FaMapMarkerAlt size={20} className="contact-icon" />
          <div>
            <h4>Address</h4>
            <p>
              Narasaraopeta Engineering College, <br />
              Yallamanda Road, Narasaraopet, <br />
              Andhra Pradesh, India
            </p>
          </div>
        </div>
        
        {/* Contact Phone */}
        <div className="contact-item">
          <FaPhoneAlt size={20} className="contact-icon" />
          <div>
            <h4>Phone</h4>
            <p>+91 123 456 7890</p>
          </div>
        </div>
        
        {/* Contact Email */}
        <div className="contact-item">
          <FaEnvelope size={20} className="contact-icon" />
          <div>
            <h4>Email</h4>
            <p>nrtec@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Side Image */}
      <div className="contact-image-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJY2ZovNvUUalFrMT_-FM5Q5eeGtIuvQLIHCtEXWeJnanrYxteWaM0eqaLYK_adTO_1hM&usqp=CAU"
          alt="Narasaraopeta Engineering College"
          className="contact-image"
        />
      </div>

        {/* Footer */}
        <footer className="footer">
        <p>
          © {new Date().getFullYear()} Narasaraopeta Engineering College. All
          rights reserved.
        </p>
        <p>Contact us at alumni@nec.edu.in</p>
      </footer>
    </div>
  );
};

export default ContactUs;
