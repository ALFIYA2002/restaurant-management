const Order = require("../models/orderListModel");
const Dish = require("../models/fooddishesModel");
const TodaysMenu = require("../models/todaysMenuModel");

module.exports = {
  createOrderHelper: async (orderData, quantity) => {
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    await TodaysMenu.findOneAndUpdate(
      { dishName: orderData.orders[0].dishName },
      { $inc: { stock: -quantity } },
      { new: true }
    );
    return savedOrder;
  },

  getOrderListHelper: async () => {
    return await Order.find({}, {});
  },

  addFoodOrderHelper: async (orderId, dishName, quantity) => {
    const dishData = await Dish.findOne({ dishesName: dishName });
    const totalPrice = dishData.price * quantity;
    return await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        $push: { orders: { dishName, price: dishData.price, quantity } },
        $inc: { totalAmount: totalPrice },
      },
      { new: true }
    );
  },

  updateOrderStatusHelper: async (orderId) => {
    return await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { orderStatus: 'served' } },
      { new: true }
    );
  },
  

    addFoodOrder: async (orderId, dishName, quantity) => {
      try {
        // Fetch the price of the dish from the database
        const dishData = await Dish.findOne({ dishesName: dishName });
    
        // If no dish data found, return error
        if (!dishData) {
          return { success: false, status: 404, message: "Dish not found" };
        }
    
        // Calculate the total price of the order
        const totalPrice = dishData.price * quantity;
    
        // Update the order by pushing new order data to the orders array and adding totalPrice to totalAmount
        const updatedOrderData = await Order.findByIdAndUpdate(
          { _id: orderId },
          {
            $push: { orders: { dishName, price: dishData.price, quantity } },
            $inc: { totalAmount: totalPrice }
          },
          { new: true } // To return the updated document
        );
    
        if (!updatedOrderData) {
          return { success: false, status: 404, message: "Order not found" };
        }
    
        return { success: true, data: updatedOrderData };
      } catch (error) {
        console.error("Error in addFoodOrder:", error);
        return { success: false, status: 500, message: "Internal Server Error" };
      }
    }
  };
  


