const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set the upload directory path
const uploadDirectory = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Setup multer storage for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the upload directory exists before saving files
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
  },
});

const upload = multer({ storage: storage });

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456", // Replace with your MySQL password
  database: "durga",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the app if DB connection fails
  }
  console.log("Connected to MySQL database");
});

// Routes

// GET all members
app.get("/mail", (req, res) => {
  const query = "SELECT * FROM mail";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching members:", err);
      return res.status(500).send("Error fetching members");
    }
    res.json(results);
  });
});

// GET a single member by ID
app.get("/mail/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM mail WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching member:", err);
      return res.status(500).send("Error fetching member");
    } else if (results.length === 0) {
      return res.status(404).send("Member not found");
    } else {
      res.json(results[0]);
    }
  });
});

// POST - Register a new member (with photo upload)
app.post("/mail", upload.single("photo"), (req, res) => {
  const { name, email, clg_email, password, job, company, role, education, experiences, vacancies, branch, batch } = req.body;

  // Validate required fields
  if (!name || !email || !clg_email || !password || !education) {
    return res
      .status(400)
      .send("Missing required fields: name, email, clg_email, password, education");
  }

  // Validate email format
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format");
  }

  // Handle the photo upload path
  const photo = req.file ? `/uploads/${req.file.filename}` : null; // Save the file path in database

  const query = `
    INSERT INTO mail(name, email, clg_email, password, job, company, role, education, experiences, vacancies, branch, batch, photo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [
      name,
      email,
      clg_email,
      password,
      job,
      company,
      role,
      education,
      experiences,
      vacancies,
      branch,
      batch,
      photo,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting member:", err);
        return res.status(500).send("Error registering member");
      }
      res.status(201).send({ id: result.insertId, ...req.body, photo });
    }
  );
});

// PUT - Update a member's details
app.put("/mail/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    clg_email,
    password,
    job,
    company,
    role,
    education,
    experiences,
    vacancies,
    branch,
    batch,
  } = req.body;

  const query = `
    UPDATE mail SET
      name = ?, email = ?, clg_email = ?, password = ?, job = ?, company = ?, role = ?, education = ?, experiences = ?, vacancies = ?, branch = ?, batch = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [
      name,
      email,
      clg_email,
      password,
      job,
      company,
      role,
      education,
      experiences,
      vacancies,
      branch,
      batch,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating member:", err);
        return res.status(500).send("Error updating member");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Member not found");
      }
      res.send("Member updated successfully");
    }
  );
});

// DELETE - Remove a member
app.delete("/mail/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM mail WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting member:", err);
      return res.status(500).send("Error deleting member");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Member not found");
    }
    res.send("Member deleted successfully");
  });
});

// Serve uploaded files from the "uploads" folder
app.use("/uploads", express.static("uploads"));

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).send("Something went wrong. Please try again later.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
