const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const db = require("./config/db");

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors());


// Database Connection
db(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/v1", require("./routes/competitions"));
app.use("/api/v1", require("./routes/participants"));
app.use("/api/v1", require("./routes/ratings"));


module.exports = app;
