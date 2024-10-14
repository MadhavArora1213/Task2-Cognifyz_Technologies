const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Temporary server-side storage
let submittedData = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the form
app.get("/", (req, res) => {
  res.render("index");
});

// Route to handle form submission with server-side validation
app.post("/submit-form", (req, res) => {
  const { name, email, age, password } = req.body;

  // Server-side validation
  if (!name || !email || !age || !password) {
    res.send("All fields are required. Please go back and fill in all fields.");
    return;
  }

  if (age < 18) {
    res.send("You must be at least 18 years old to submit the form.");
    return;
  }

  // Data is valid, store in temporary server-side storage
  submittedData.push({ name, email, age, password });
  console.log(submittedData);

  // Render the response page with validated data
  res.render("response", { name, email, age });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
