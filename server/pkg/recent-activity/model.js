const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  username: String,
  action: String,
  timestamp: { type: Date, default: Date.now },
});

const Activity = mongoose.model("activities", activitySchema, "activities");

module.exports = {
  Activity,
};
