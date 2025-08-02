import React from "react";
import "./Department.css"; // For styling

const Department = () => {
  return (
    <div className="department-card">
      {/* Department Image */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmdpAtEyF31Chcp-jbYhVEcuraDT9_-vpVmdObzxhn6Sr__T_1XZYhDE0BZEOGjd3nxzM&usqp=CAU"
        alt="CSE Department"
        className="department-image"
      />

      {/* Department Content */}
      <div className="department-content">
        <h1>CSE HOD</h1>
        <h2>Department of Computer Science and Engineering</h2>
        
        {/* Department Overview */}
        <section className="overview">
          <h3>Department Overview</h3>
          <p>
            The Department of Computer Science and Engineering at Narasaraopeta
            Engineering College is one of the leading departments, offering top-tier education and fostering innovation. 
            With a state-of-the-art infrastructure and highly qualified faculty, we aim to create a nurturing environment 
            for the next generation of IT professionals.
          </p>
        </section>

        {/* Programs Offered */}
        <section className="programs">
          <h3>Programs Offered</h3>
          <ul>
            <li>Bachelor of Technology (B.Tech) in Computer Science and Engineering</li>
            <li>Master of Technology (M.Tech) in Computer Science and Engineering</li>
          
          </ul>
        </section>

        {/* Achievements */}
        <section className="achievements">
          <h3>Achievements</h3>
          <p>
            The department has consistently ranked among the top in the region for academic excellence. Our students 
            regularly win awards in national coding competitions, and many of our alumni have been placed in top 
            companies worldwide, such as Google, Microsoft, Amazon, and others.
          </p>
        </section>

        {/* Research and Development */}
        <section className="research">
          <h3>Research & Development</h3>
          <p>
            Our department is actively engaged in research in cutting-edge fields such as Artificial Intelligence, 
            Machine Learning, Data Science, and Cybersecurity. The faculty members are involved in various research 
            projects funded by both government and private organizations, contributing to global advancements.
          </p>
        </section>

        {/* Faculty */}
        <section className="faculty">
          <h3>Our Esteemed Faculty</h3>
          <p>
            The department boasts a dedicated and highly experienced faculty team with Ph.D. holders from reputed institutions.
            Our faculty members are passionate about mentoring students, guiding them in both academic and extracurricular activities.
          </p>
        </section>

        {/* Student Activities */}
        <section className="activities">
          <h3>Student Activities</h3>
          <p>
            The department encourages students to participate in various technical clubs, hackathons, coding competitions, and
            workshops. This helps in building teamwork, leadership, and technical skills, contributing to the holistic development of students.
          </p>
        </section>

        {/* Alumni Engagement */}
        <section className="alumni">
          <h3>Alumni Engagement</h3>
          <p>
            We have an active alumni network that provides mentorship and career guidance to current students. The Alumni 
            Automation System is a platform that helps us stay connected with alumni, share job opportunities, and organize 
            events for mutual benefit.
          </p>
        </section>
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

export default Department;
