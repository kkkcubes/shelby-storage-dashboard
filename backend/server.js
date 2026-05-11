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
const filesRoute = require("./routes/files");
const shareRoute = require("./routes/share");

// SOCKET
const { initSocket } = require("./socket");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("Shelby Backend Running");
});

// Static files (optional but useful for uploads)
app.use(
  "/storage",
  express.static(path.join(__dirname, "storage"))
);

// Routes
app.use("/upload", uploadRoute);
app.use("/ai", aiRoute);
app.use("/files", filesRoute);
app.use("/share", shareRoute);

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