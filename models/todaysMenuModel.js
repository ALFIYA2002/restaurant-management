const mongoose = require('mongoose');

const todaysMenuSchema = new mongoose.Schema({
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cheff' // Assuming 'Chef' is the correct model name for the chef collection
  },
  dishId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish' // Assuming 'Dish' is the correct model name for the dish collection
  },
  dishName: {
    type: mongoose.Schema.Types.String,
    ref: 'Dish' // Assuming 'Dish' is the correct model name for the dish collection
  },
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    default: 'null'
  },
  stock:{
    type:Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TodaysMenu = mongoose.model("TodaysMenu", todaysMenuSchema);

module.exports = TodaysMenu;





