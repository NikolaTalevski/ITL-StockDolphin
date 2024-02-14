const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");

const api = express();

const recentActivity = [];

api.post("/api/v1/recent-activity", (req, res) => {
  const activity = req.body;
  recentActivity.unshift(activity);
  res.status(201).send("Activity added successfully");
});

api.get("/api/v1/recent-activity", (req, res) => {
  res.json(recentActivity);
});

api.listen(config.getSection("services").recentactivity.port, (err) => {
  if (err) return console.log(err);
  console.log(
    `Server started on port ${
      config.getSection("services").recentactivity.port
    }`
  );
});
