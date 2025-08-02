import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Crud.css";

const Crud = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("Insert"); // Insert, Read, Update
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [currentId, setCurrentId] = useState(null);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3005/register");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open Modal
  const openModal = (mode, id = null) => {
    setModalMode(mode);
    setIsModalOpen(true);
    if (mode === "Update" || mode === "Read") {
      const selectedUser = users.find((user) => user.id === id);
      if (selectedUser) {
        setFormData({
          name: selectedUser.name,
          email: selectedUser.email,
          password: "",
          confirmPassword: "",
        });
      }
      setCurrentId(id);
    } else {
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setCurrentId(null);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Submit (Insert or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("All fields are required.");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.match(emailPattern)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!formData.password.match(passwordPattern)) {
      alert("Password must be at least 6 characters long and include both lowercase and uppercase letters.");
      return;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      if (modalMode === "Update") {
        await axios.put(`http://localhost:3005/user/${currentId}`, formData);
        alert("User updated successfully");
      } else if (modalMode === "Insert") {
        await axios.post("http://localhost:3005/register", formData);
        alert("User registered successfully");
      }

      closeModal();
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/user/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="crud-container">
      <h2>CRUD Operations</h2>
      <button className="insert-button" onClick={() => openModal("Insert")}>
        Insert User
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modalMode} User</h3>
            {(modalMode === "Insert" || modalMode === "Update") && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button type="submit">{modalMode === "Insert" ? "Register" : "Update"}</button>
                </div>
              </form>
            )}
            {modalMode === "Read" && (
              <div>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
              </div>
            )}
            <div>
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <h3>Registered Users</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="actions">
                <button className="read-btn" onClick={() => openModal("Read", user.id)}>
                  Read
                </button>
                <button className="update-btn" onClick={() => openModal("Update", user.id)}>
                  Update
                </button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default Crud;
