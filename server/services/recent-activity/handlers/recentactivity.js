const { Activity } = require("../../../pkg/recent-activity/model");

const getRecentActivity = async (req, res) => {
  try {
    const recentActivity = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(5);
    console.log("Recent activity: ", recentActivity);
    if (!recentActivity || !Array.isArray(recentActivity)) {
      throw new Error("Recent activity data is not available or not an array");
    }
    res.json(recentActivity);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getRecentActivity,
};
