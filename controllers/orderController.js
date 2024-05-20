const orderHelper = require("../helpers/orderHelper");
const Order = require('../models/orderListModel')
module.exports = {
  createOrderList: async (req, res) => {
    try {
      const { tableName, chefId, dishName, quantity } = req.body;
      const dishData = await dish.findOne({ dishesName: dishName });
      const orderData = {
        tableName: tableName,
        chefId: chefId,
        orders: [{ dishName, price: dishData.price, quantity }],
        totalAmount: dishData.price * quantity,
        orderStatus: 'pending',
      };
      const savedOrder = await orderHelper.createOrderHelper(orderData, quantity);
      res.status(201).json({
        isSuccess: true,
        response: savedOrder,
        error: null,
      });
    } catch (error) {
      console.log("Failed to create order list ", error);
      res.status(500).json({
        isSuccess: false,
        response: {},
        error: "Failed to create order",
      });
    }
  },

  getOrderList: async (req, res) => {
    try {
      if (
        !req.userType ||
        (req.userType !== "manager" &&
          req.userType !== "supplier" &&
          req.userType !== "chef")
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized access" });
      }
      const orders = await orderHelper.getOrderListHelper();
      res.json({ success: true, orders });
    } catch (error) {
      console.log("Failed fetching OrderList", error);
      res.status(500).json({
        success: false,
        error: "Failed fetching order",
      });
    }
  },
  
 
  addFoodOrderList: async (req, res) => {
    // Validate request data
    const { error } = addFoodOrderListValidator(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    try {
      // Check user type
      if (!req.userType || (req.userType !== "manager" && req.userType !== "supplier")) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
      }

      // Extract necessary data from the request body
      const { orderId, dishName, quantity } = req.body;

      // Delegate to helper
      const result = await orderHelper.addFoodOrder(orderId, dishName, quantity);
      if (result.success) {
        return res.status(200).json({ success: true, message: "Order updated successfully", updatedOrderData: result.data });
      } else {
        return res.status(result.status).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  orderServed: async (req, res) => {
    try {
      // Check user type
      if (!req.userType || (req.userType !== "supplier")) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
      }
  
      const { orderId } = req.body;
  
      // Find the order by its ID and update its status to 'served'
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: { orderStatus: 'served' } },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Order status updated to served",
        updatedOrder
      });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
      });
    }
  }
}  





