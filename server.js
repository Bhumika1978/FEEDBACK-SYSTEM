const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "data.json");

function readData() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data || "[]");
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post("/feedback", (req, res) => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (feedback.length > 1000) {
    return res.status(400).json({ message: "Feedback too long" });
  }

  try {
    const data = readData();

    // Duplicate check
    const exists = data.find(
      (item) => item.email === email && item.feedback === feedback
    );

    if (exists) {
      return res.status(400).json({ message: "Duplicate feedback" });
    }

    const newEntry = {
      id: Date.now(),
      name,
      email,
      feedback,
      createdAt: new Date()
    };

    data.push(newEntry);
    writeData(data);

    res.json({ message: "Feedback submitted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});