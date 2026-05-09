require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");

const uploadRoute = require("./routes/upload");
const aiRoute = require("./routes/ai");

const { initSocket } = require("./socket");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use(
  "/storage",
  express.static(path.join(__dirname, "storage"))
);

// Routes
app.use("/upload", uploadRoute);
app.use("/ai", aiRoute);

// Create HTTP server
const server = http.createServer(app);

// Initialize socket
initSocket(server);

// Port setup
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});