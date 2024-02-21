const mongoose = require("mongoose");

const { Activity } = require("./model");

const getActivities = async (activityAction) => {
  if (activityAction !== null || activityAction !== "") {
    return await Activity.find({ action: activityAction });
  }
  return await Activity.find();
};

const createActivity = async (a) => {
  const activity = new Activity(a);
  return await activity.save();
};

module.exports = {
  getActivities,
  createActivity,
};
