require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");

// DB connection
const connectDB = require("./config/db");

// ROUTES
const uploadRoute = require("./routes/upload");
const aiRoute = require("./routes/ai");

// ✅ SHARE ROUTE ADDED
const shareRoute = require("./routes/share");

// FILES ROUTE
const filesRoute = require("./routes/files");

// SOCKET
const { initSocket } = require("./socket");

const app = express();

// Connect to database
connectDB();

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

// ✅ SHARE ROUTE MOUNTED
app.use("/share", shareRoute);

// FILES ROUTE
app.use("/files", filesRoute);

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