const chefHelper = require("../helpers/chefHelper");

module.exports = {
  getchefDetails: async (req, res) => {
    try {
      if (req.userType !== "manager") {
        return res.status(403)
        .json({ isSuccess: false,
           message: "Unauthorized access" });
      }

      const chefs = await chefHelper.getChefDetailsHelper();
      res.json({ isSuccess: true, response: chefs, error: false });
    } catch (error) {
      console.error("Error fetching chef details:", error);
      res.status(500).json({ isSuccess: false, message: "Internal server error" });
    }
  },

  getChefDetailsandDishes: async (req, res) => {
    try {
      if (req.userType !== "manager") {
        return res.status(403).json({ isSuccess: false, message: "Unauthorized access" });
      }

      const chefs = await chefHelper.getChefDetailsAndDishesHelper();
      if (!chefs || chefs.length === 0) {
        return res.status(404).json({ isSuccess: false, response: {}, error: "No chefs found" });
      }
      res.json({ isSuccess: true, response: chefs, error: false });
    } catch (error) {
      console.error("Error fetching chefs details:", error);
      res.status(500).json({ isSuccess: false, response: {}, error: "Failed to fetch chefs details" });
    }
  }
};

