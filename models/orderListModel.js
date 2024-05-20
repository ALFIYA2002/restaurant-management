const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({

  tableName: {
    type: String,
  },
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cheff",
  },
  orders: [
    {
      dishName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  totalAmount: {
    type: Number,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'], // Add more statuses if needed
    default: 'pending', // Default status is pending
  },
 
});
const order = mongoose.model("Order", orderSchema);
module.exports = order;
