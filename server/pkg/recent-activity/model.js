const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    username: String,
    action: String,
    entityName: String,
    entityType: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

const ActivityAction = {
  Created: "created",
  Edited: "edited",
  Moved: "moved",
  Deleted: "deleted",
  Ordered: "ordered",
};

const ActivityEntityType = {
  Item: "item",
  Category: "category",
  Supplier: "supplier",
  Order: "order for item",
};

const Activity = mongoose.model("activities", activitySchema, "activities");

module.exports = {
  Activity,
  ActivityAction,
  ActivityEntityType,
};
