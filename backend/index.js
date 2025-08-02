const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const port = 3005;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your DB user
  password: "123456", // Replace with your DB password
  database: "durga", // Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
  console.log("Connected to database");
});

// POST: Register a new user
app.post("/Register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Confirm password matches
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.match(emailPattern)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  // Password validation
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!password.match(passwordPattern)) {
    return res.status(400).json({ message: "Password must be at least 6 characters long and include both lowercase and uppercase letters." });
  }

  try {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if email already exists
    const emailCheckQuery = "SELECT * FROM user WHERE email = ?";
    db.query(emailCheckQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ message: "Database error" });
      }
      if (result.length > 0) {
        return res.status(400).json({ message: "Email already exists." });
      }

      // Insert the new user into the database
      const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
      db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "User registered successfully", id: result.insertId });
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Retrieve all users
app.get("/Register", (req, res) => {
  const sql = "SELECT id, name, email FROM user";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
});

// GET: Retrieve a user by ID
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, name, email FROM user WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result[0]);
  });
});

// PUT: Update a user by ID
app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, confirmPassword } = req.body;

  // Validate input: Ensure at least one field is provided
  if (!name && !email && !password && !confirmPassword) {
    return res.status(400).json({ message: "At least one field is required to update." });
  }

  // Confirm password matches
  if (password && password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Construct the dynamic SQL query for updating fields
    const fieldsToUpdate = [];
    const values = [];

    if (name) {
      fieldsToUpdate.push("name = ?");
      values.push(name);
    }
    if (email) {
      fieldsToUpdate.push("email = ?");
      values.push(email);
    }
    if (password) {
      // Hash the new password before saving
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      fieldsToUpdate.push("password = ?");
      values.push(hashedPassword);
    }

    // Add the ID as the last value
    values.push(id);

    // Generate the SQL query dynamically
    const sql = `UPDATE user SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // Check if any row was updated
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully" });
    });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE: Delete a user by ID
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM user WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
