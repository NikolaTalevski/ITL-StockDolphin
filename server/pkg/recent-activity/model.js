const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    username: String,
    action: String,
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("activities", activitySchema, "activities");

module.exports = {
  Activity,
};
