import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUserPlus,
  FaSignInAlt,
  FaInfoCircle,
  FaDatabase,
  FaUsers,
  FaPhoneAlt,
  FaImages,
  FaLaptopCode,
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img
            src="https://i0.wp.com/www.nrtec.in/wp-content/uploads/2017/03/NEClogo.png?resize=300%2C274&ssl=1"
            alt="NEC Logo"
            className="logo"
          />
          <div className="text-container">
            <h1>Narasaraopeta Engineering College</h1>
            <h2>Alumni Automation System</h2>
          </div>
        </div>
        <div className="header-right">
          <img
            src="https://www.nrtec.in/wp-content/uploads/2024/08/new-heder-logo-1.png"
            alt="Additional Logo"
            className="extra-logo"
          />
        </div>
      </header>

      {/* Navbar */}
      <nav className="nav">
        <div className="nav-container">
          <div className="menu">
            <ul>
              <li>
                <Link to="/Home">
                  <FaHome /> Home
                </Link>
              </li>
              <li>
                <Link to="/Register">
                  <FaUserPlus /> Register
                </Link>
              </li>
              <li>
                <Link to="/Gallery">
                  <FaImages /> Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="search-and-toggle">
            <input type="text" placeholder="Search..." className="search-bar" />
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
              {isSidebarOpen ? "×" : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/About" onClick={toggleSidebar}>
              <FaInfoCircle /> About
            </Link>
          </li>
          <li>
            <Link to="/Login" onClick={toggleSidebar}>
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/Members" onClick={toggleSidebar}>
              <FaUsers /> Members
            </Link>
          </li>
          <li>
            <Link to="/ContactUs" onClick={toggleSidebar}>
              <FaPhoneAlt /> Contact Us
            </Link>
          </li>
          <li>
            <Link to="/Crud" onClick={toggleSidebar}>
              <FaDatabase /> Crud
            </Link>
          </li>
          <li>
            <Link to="/Department" onClick={toggleSidebar}>
              <FaLaptopCode /> Department
            </Link>
          </li>
        </ul>
      </aside>
  
    </>
  );
}

export default Navbar;

