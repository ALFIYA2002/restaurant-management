const chefModel = require("../models/cheffModel")  

module.exports = {
    createDish: async (dishData) => {
      try {
        // Create a new dish instance
        const newDish = new Dish({
          dishesName: dishData.dishesName,
          cuisine: dishData.cuisine,
          price: dishData.price,
          deleted: dishData.deleted,
          chefId: dishData.chefId
        });
  
        // Save the dish to the database
        const savedDish = await newDish.save();
        await chefModel.findByIdAndUpdate(dishData.chefId, { $push: { dishes: savedDish._id } });
  
        return {
          success: true,
          data: savedDish
        };
      } catch (error) {
        return {
          success: false,
          data: error.message
        };
      }
    },

}