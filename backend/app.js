const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static())

const PORT = process.env.PORT || 4001;

app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
