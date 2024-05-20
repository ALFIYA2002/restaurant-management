const  createDishHelper  = require("../helpers/dishHelper");

module.exports= {

createDish: async (req, res) => {
  try {
    const dishData = {
      dishesName: req.body.dishesName,
      cuisine: req.body.cuisine,
      deleted: false,
      chefId: req.body.chefId,
    };
    createDishHelper
      .createDish(dishData)
      .then((saveDish) => {
        res.json({
          isSuccess: true,
          response: saveDish,
          error: false,
        });
      })
      .catch((error) => {
        res.json({
          isSuccess: false,
          response: [],
          error: error.message,
        });
      });
  } catch (error) {
    res.json({
      isSuccess: false,
      response: {},
      error: error.message,
    });
  }},
  
  updateDishPrice: async (req, res) => {
    try {
      const { dishId, newPrice } = req.body;

      // Update the dish price
      const updatedDish = await dish.findByIdAndUpdate(
        dishId,
        { price: newPrice },
        { new: true }
      );

      if (!updatedDish) {
        return res.status(404).json({
          isSuccess: false,
          response: {},
          error: "Dish not found",
        });
      }

      res.json({
        isSuccess: true,
        response: updatedDish,
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        isSuccess: false,
        response: {},
        error: error.message,
      });
    }
  },

  getUpdatedDishPrice: async (req, res) => {
    try {
      if (req.userType !== "manager") {
        return res
          .status(403)
          .json({ isSuccess: false, message: "Unauthorized access" });
      }

      // Find all dishes and select only the _id and price fields
      // const updatedDishes = await dish.find({}, 'dishesName price');
      const updatedDishes = await dish.find(
        { price: { $exists: true } },
        "dishesName price"
      );

      // If no dishes are found
      if (!updatedDishes || updatedDishes.length === 0) {
        return res.status(404).json({
          isSuccess: false,
          response: {},
          error: "No dishes found",
        });
      }

      
      res.json({
        isSuccess: true,
        response: updatedDishes,
        error: null,
      });
    } catch (error) {
      // Handle errors
      console.error("Error fetching updated dish prices:", error);
      res.status(500).json({
        isSuccess: false,
        response: {},
        error: "Failed to fetch updated dish prices",
      });
    }
  },

}
  
