const express = require("express");
const path = require("path");
const app = express();

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// When someone goes to "/", send them index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 4000;
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
