const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  dishesName: {
    type: String
  },
  cuisine: {
    type: String
  },
  deleted: {
    type: Boolean
  },
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cheff' // Corrected the reference to 'Chef'
  },
  price: {
    type: Number
  }
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
