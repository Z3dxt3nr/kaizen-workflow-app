const express = require("express");
const path = require("path");
const app = express();

// Serve static files from "public" folder (use absolute path)
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// When someone goes to "/", send them index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = 4000;
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
