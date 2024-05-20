// helpers/menuHelper.js
const TodaysMenu = require('../models/todaysMenuModel')



module.exports = {
  createMenuHelper: async (menuData) => {
    const newMenu = new TodaysMenu(menuData);
    return await newMenu.save();
  },

  getTodayMenuHelper: async (startDate, endDate) => {
    return await TodaysMenu.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).populate({ path: "dish", options: { strictPopulate: false } });
  },
};
