import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Members.css";

function Members() {
  const [members, setMembers] = useState([]);
  const [view, setView] = useState("register");
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    clg_email: "nrtec@gmail.com",
    password: "",
    job: "",
    company: "",
    role: "",
    education: "",
    branch: "",
    batch: "",
    experiences: "",
    vacancies: "",
    photo: null, // Added photo field here
  });

  const [showBranchBatch, setShowBranchBatch] = useState(false);

  // Fetch members from the backend when component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:4002/mail");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []); // This useEffect will run when the component is mounted

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "education") {
      setShowBranchBatch(value.toLowerCase() === "narasaraopeta engineering college");
    }
  };

  // Handle photo file change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0], // Save the file to state
    });
  };

  // Handle form submission for registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate inputs
    const { name, email, password, clg_email, education } = formData;
    if (!name.trim() || !email.trim() || !password.trim() || !clg_email.trim() || !education.trim()) {
      alert("All fields except job, company, role, experiences, branch, and vacancies are required.");
      return;
    }
    if (education.toLowerCase() !== "narasaraopeta engineering college") {
      alert("Only members from Narasaraopeta Engineering College are allowed.");
      return;
    }

    // Prepare data to send to backend
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:4002/mail", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Member registered successfully!");
      setMembers([...members, response.data]);

      // Clear form after successful registration
      setFormData({
        name: "",
        email: "",
        clg_email: "nrtec@gmail.com",
        password: "",
        job: "",
        company: "",
        role: "",
        education: "",
        branch: "",
        batch: "",
        experiences: "",
        vacancies: "",
        photo: null, // Clear photo after submission
      });
      setShowBranchBatch(false);
    } catch (error) {
      console.error("Error registering member:", error);
      alert("Error registering member");
    }
  };

  // Handle viewing a member's details
  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setView("dashboard");
  };

  return (
    <div className="members-page">
      {view === "register" && (
        <div className="register-container">
          <h2>Register to Become a Member</h2>
          <form onSubmit={handleRegister} className="register-form">
            {/* Personal Details Section */}
            <h3>Personal Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="clg_email"
              placeholder="nrtec@gmail.com"
              value={formData.clg_email}
              readOnly
            />

            {/* Password Section */}
            <h3>Password</h3>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {/* Education Section */}
            <h3>Education</h3>
            <input
              type="text"
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleInputChange}
              required
            />

            {showBranchBatch && (
              <>
                <input
                  type="text"
                  name="branch"
                  placeholder="Branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="batch"
                  placeholder="Batch (e.g., 2020-2024)"
                  value={formData.batch}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            {/* Job Info Section */}
            <h3>Job Information</h3>
            <input
              type="text"
              name="job"
              placeholder="Job"
              value={formData.job}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleInputChange}
            />

            {/* Experiences Section */}
            <h3>Experiences</h3>
            <textarea
              name="experiences"
              placeholder="Experiences"
              value={formData.experiences}
              onChange={handleInputChange}
            ></textarea>

            {/* Vacancies Section */}
            <h3>Vacancies</h3>
            <textarea
              name="vacancies"
              placeholder="Enter any vacancies in your company"
              value={formData.vacancies}
              onChange={handleInputChange}
            ></textarea>

            {/* Photo Section */}
            <h3>Profile Photo</h3>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>
        </div>
      )}

      {view === "dashboard" && selectedMember && (
        <div className="dashboard-container">
          <h2>{selectedMember.name}'s Dashboard</h2>

              {/* Profile Photo - Rounded Image */}
    {selectedMember.photo && (
      <div className="profile-photo-container">
        <img
          src={`http://localhost:4002${selectedMember.photo}`}
          alt="Profile"
          className="profile-photo"
        />
      </div>
    )}
          
          {/* Personal Details Section */}
          <h3>Personal Details</h3>
          <p>Email: {selectedMember.email}</p>
          <p>Clg Email: {selectedMember.clg_email}</p>

          {/* Education Section */}
          <h3>Education</h3>
          <p>CollegeName: {selectedMember.education}</p>
          <p>Branch: {selectedMember.branch}</p>
          <p>Batch: {selectedMember.batch}</p>

          {/* Professional Information Section */}
          <h3>Professional Information</h3>
          <p>Job: {selectedMember.job || "Not specified"}</p>
          <p>Company: {selectedMember.company || "Not specified"}</p>
          <p>Role: {selectedMember.role || "Not specified"}</p>
          <p>Experiences: {selectedMember.experiences || "None"}</p>

          {/* Vacancies Section */}
          <h3>Company Vacancies</h3>
          <p>{selectedMember.vacancies || "No vacancies specified"}</p>

        

          <button onClick={() => setView("register")} className="back-btn">
            Back to Registration
          </button>
        </div>
      )}

      {/* Member List Display */}
      {view === "register" && (
        <div className="member-list-container">
          <h2>Registered Members</h2>
          <ul>
            {members.map((member) => (
              <li key={member.id} onClick={() => handleViewDetails(member)}>
                {member.name}
              </li>
            ))}
          </ul>
        </div>
      )}

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
}

export default Members;
