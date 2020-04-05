"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const employeeRoutes = require("./routes/employee");
const port = parseInt(process.env.PORT || "3000");
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/employees", employeeRoutes);

// Fail over route
app.use(function (req, res) {
  res.status(404).send("Not found");
});

// listen for requests
app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
