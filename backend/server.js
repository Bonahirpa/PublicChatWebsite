require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register User
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) return res.json({ success: false, message: "Username taken" });
    res.json({ success: true, message: "User registered" });
  });
});

// Login User
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
          res.json({
            success: true,
            user: { id: user.id, username: user.username },
          });
        } else {
          res.json({ success: false, message: "Wrong password" });
        }
      } else {
        res.json({ success: false, message: "User not found" });
      }
    }
  );
});

// Fetch Users
app.get("/users", (req, res) => {
  db.query("SELECT id, username FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Fetch Messages
app.get("/messages", (req, res) => {
  db.query(
    "SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id ORDER BY created_at DESC",
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Post Message
app.post("/messages", (req, res) => {
  const { user_id, message } = req.body;
  db.query(
    "INSERT INTO messages (user_id, message) VALUES (?, ?)",
    [user_id, message],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    }
  );
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
