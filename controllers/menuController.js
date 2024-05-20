const menuHelper = require("../helpers/menuHelper");

module.exports = {
  createTodaysMenu: async (req, res) => {
    try {
      const menuData = {
        chefId: req.body.chefId,
        dishId: req.body.dishId,
        category: req.body.category,
        stock: req.body.stock,
        dishName: req.body.dishName,
      };
      const savedMenu = await menuHelper.createMenuHelper(menuData);
      res.status(201).json({
        isSuccess: true,
        response: savedMenu,
        error: null,
      });
    } catch (error) {
      console.error("Error creating today's menu:", error);
      res.status(500).json({
        isSuccess: false,
        response: {},
        error: "Failed to create today's menu",
      });
    }
  },

  todaysMenu: async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const todayMenu = await menuHelper.getTodayMenuHelper(today, endDate);
      res.status(200).json({
        isSuccess: true,
        response: todayMenu,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching today's menu:", error);
      res.status(500).json({
        isSuccess: false,
        response: {},
        error: "Failed to fetch today's menu",
      });
    }
  },
};
