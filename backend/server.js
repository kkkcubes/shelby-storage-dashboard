require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");

const uploadRoute = require("./routes/upload");
const aiRoute = require("./routes/ai");

const {
  initSocket,
} = require("./socket");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/storage",
  express.static(
    path.join(__dirname, "storage")
  )
);

app.use("/upload", uploadRoute);
app.use("/ai", aiRoute);

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});