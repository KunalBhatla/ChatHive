const express = require("express");

const app = express();

const PORT = process.env.PORT || 4001;

app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
