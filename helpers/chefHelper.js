const Cheff = require("../models/cheffModel");

module.exports = {
  getChefDetailsHelper: async () => {
    return await Cheff.find({}, { password: 0, dishes: 0 });
  },

  getChefDetailsAndDishesHelper: async () => {
    return await Cheff.find().populate("dishes");
  }
};
