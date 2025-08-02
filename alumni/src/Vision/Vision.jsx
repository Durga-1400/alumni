import React from "react";
import "./Vision.css";

const Vision = () => {
  return (
    <>
    <div className="vision-mission-container">
      <div className="vision-section">
        <h2>Vision</h2>
        <ul className="dotted-list">
          <p>To create a connected and vibrant alumni community.</p>
          <p>Foster lifelong relationships between Narasaraopeta Engineering College and its alumni.</p>
          <p>Support the professional growth of alumni through shared knowledge and opportunities.</p>
          <p>Contribute to the continuous improvement of the college.</p>
        </ul>
      </div>

      <div className="mission-section">
        <h2>Mission:</h2>
        <ul className="dotted-list">
          <p>Strengthen the bond between alumni and the college.</p>
          <p>Provide access to career resources, networking opportunities, and mentorship.</p>
          <p>Encourage alumni participation in college development.</p>
          <p>Inspire alumni to contribute back to society through educational and social initiatives.</p>
          <p>Foster engagement by offering platforms for communication, events, and collaborations.</p>
        </ul>
      </div>
      
    </div>
     <div>
       {/* Footer */}
       <footer className="footer">
        <p>
          © {new Date().getFullYear()} Narasaraopeta Engineering College. All
          rights reserved.
        </p>
        <p>Contact us at alumni@nec.edu.in</p>
      </footer>
    
    </div>
    </>
  );
};

export default Vision;
