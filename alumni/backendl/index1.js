const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3012;

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost', // or your MySQL host
    user: 'root',      // MySQL username
    password: '123456', // MySQL password
    database: 'durga'  // MySQL database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Get all users
app.get('/login', (req, res) => {
    db.query('SELECT * FROM login', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Get a single user by ID
app.get('/login/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM login WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Add a new user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    db.query('INSERT INTO login (username, password) VALUES (?, ?)', [username, password], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: results.insertId, username, password });
        }
    });
});

// Update an existing user by ID
app.put('/login/:id', (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.query('UPDATE login SET username = ?, password = ? WHERE id = ?', [username, password, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ id, username, password });
        }
    });
});

// Delete a user by ID
app.delete('/login/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM login WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(204).send(); // No content to return for deletion
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

