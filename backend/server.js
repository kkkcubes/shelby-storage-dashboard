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

// =========================
// CONNECT DATABASE
// =========================
connectDB();

// =========================
// MIDDLEWARE
// =========================
app.use(
  cors({
    origin: "*",
  })
);

// ✅ JSON BODY PARSER (ADDED)
app.use(express.json());

// =========================
// ROOT TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Shelby Backend Running");
});

// =========================
// STATIC FILE SERVING (ADDED FIX)
// =========================
app.use(
  "/storage",
  express.static(path.join(__dirname, "storage"))
);

// =========================
// ROUTES
// =========================
app.use("/upload", uploadRoute);
app.use("/ai", aiRoute);
app.use("/files", filesRoute);
app.use("/share", shareRoute);

// =========================
// CREATE HTTP SERVER
// =========================
const server = http.createServer(app);

// =========================
// SOCKET INIT
// =========================
initSocket(server);

// =========================
// PORT
// =========================
const PORT = process.env.PORT || 5000;

// =========================
// START SERVER
// =========================
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});