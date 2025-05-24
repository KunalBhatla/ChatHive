require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { initializeSocket } = require("./config/socket");
const path = require("path");

const app = express();

app.use(
  require("cors")({
    origin: "http://localhost:5173",
  })
);

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4001;

app.use("/api", require("./routes"));

httpServer.listen(PORT, () => console.log(`Server is running on ${PORT}`));
