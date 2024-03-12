const config = require("../../pkg/config");
require("../../pkg/db");

const {
  getRecentActivity,
  getRecentActivityHistory,
} = require("./handlers/recentactivity");

const express = require("express");

const api = express();

api.get("/api/v1/recent-activity", getRecentActivity);
api.get("/api/v1/recent-activity/history", getRecentActivityHistory);

api.listen(config.getSection("services").recentactivity.port, (err) => {
  if (err) return console.log(err);
  console.log(
    `Server started on port ${
      config.getSection("services").recentactivity.port
    }`
  );
});
