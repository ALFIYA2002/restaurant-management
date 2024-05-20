const { response } = require("express");
const userHelper = require("../helpers/userHelper");
const userValidator = require("../validator/userValidator");
const dotenv = require("dotenv");
const managerModel = require('../models/managerModel')
// const Cheff = require("../models/cheffModel");
// const dish = require("../models/fooddishesModel");
// const { json } = require("body-parser");
// const todaysMenu = require("../models/todaysModel");
// const table = require("../models/tablesModel");
// const Supplier = require("../models/supplierModel");
// const order = require("../models/orderListModel");
dotenv.config();

module.exports = {
  registerManager: async (req, res) => {
    try {
      const requestData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userType: req.body.userType,
        deleted: false,
      };

      const validatorResponse = await userValidator.createUserValidator(
        requestData
      );

      if (validatorResponse && validatorResponse.error) {
        res.json({
          isSuccess: false,
          response: {},
          error: validatorResponse.error,
        });
      } else if (validatorResponse && validatorResponse.value) {
        userHelper
          .registerManagerHelper(requestData)

          .then((response) => {
            if (response.success) {
              res.json({
                isSuccess: true,
                response: response.data,
                error: false,
              });
            } else {
              res.json({
                isSuccess: false,
                response: {},
                error: response.data,
              });
            }
          })
          .catch((error) => {
            res.json({
              isSuccess: false,
              response: {},
              error: error.data,
            });
          });
      }
    } catch (error) {
      res.json({
        isSuccess: false,
        response: {},
        error: error,
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const requestData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userType: req.body.userType,
        type: req.userType,
        deleted: false,
      };

      userHelper
        .createUserHelper(requestData)

        .then((response) => {
          if (response.success) {
            res.json({
              isSuccess: true,
              response: response.data,
              error: false,
            });
          } else {
            res.json({
              isSuccess: false,
              response: {},
              error: response.data,
            });
          }
        })
        .catch((error) => {
          res.json({
            isSuccess: false,
            response: {},
            error: error.data,
          });
        });
    } catch (error) {
      res.json({
        isSuccess: false,
        response: {},
        error: error,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const loginData = {
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
      };

      const validatorResponse = await userValidator.loginUserValidator(
        loginData
      );

      if (validatorResponse && validatorResponse.error) {
        res.json({
          isSuccess: false,
          response: {},
          error: validatorResponse.error,
        });
      } else if (validatorResponse && validatorResponse.value) {
        userHelper
          .loginUserHelper(loginData)
          .then((response) => {
            if (response.success) {
              res.json({
                isSuccess: true,
                response: response.data,
                token: response.token,
                error: false,
              });
            }
          })
          .catch((error) => {
            res.json({
              isSuccess: true,
              response: {},
              error: error.data,
            });
          });
      }
    } catch (error) {
      res.json({
        isSuccess: false,
        response: {},
        error: error,
      });
    }
  },
  managerUpdate: async (req, res) => {
    try {

      const updatedData = {
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        type: req.userType,
      };

      const updatedUser = await managerModel.findByIdAndUpdate( updatedData.userId,updatedData, { new: true });

    
      if (!updatedUser) {
        return res.status(404).json({
          isSuccess: false,
          response: {},
          error: "User not found"
        });
      }

  
      res.json({
        isSuccess: true,
        response: updatedUser,
        error: null
      });
    } catch (error) {

      res.status(500).json({
        isSuccess: false,
        response: {},
        error: error.message
      });
    }
  },

 deleteUser: async (req, res) => {
  try {
    const deleteData = {
  
      userId: req.userId
    };


      const deletedUser = await managerModel.findByIdAndUpdate(deleteData.userId,{deleted:true});
      if (!deletedUser) {
        return res.status(404).json({
          isSuccess: false,
          response: {},
          error: "User not found"
        });
      }
  
      res.status(200).json("Account has been deleted");
    
  } catch (err) {

    res.status(500).json(err);
  }
}}











//   },
//   createDish: async (req, res) => {
//     try {
//       const dishData = {
//         dishesName: req.body.dishesName,
//         cuisine: req.body.cuisine,
//         deleted: false,
//         chefId: req.body.chefId,
//       };
//       userHelper
//         .createDishHelper(dishData)
//         .then((saveDish) => {
//           res.json({
//             isSuccess: true,
//             response: saveDish,
//             error: false,
//           });
//         })
//         .catch((error) => {
//           res.json({
//             isSuccess: false,
//             response: [],
//             error: error.message,
//           });
//         });
//     } catch (error) {
//       res.json({
//         isSuccess: false,
//         response: {},
//         error: error.message,
//       });
//     }
//   },
//   getchefDetails: async (req, res) => {
//     try {
//       // Check if the authenticated user is a manager
//       if (req.userType !== "manager") {
//         return res
//           .status(403)
//           .json({ isSuccess: false, message: "Unauthorized access" });
//       }

//       // Fetch chef details
//       const chefs = await Cheff.find({}, { password: 0, dishes: 0 }); // Exclude password field
//       res.json({ success: true, chefs });
//     } catch (error) {
//       console.error("Error fetching chef details:", error);
//       res
//         .status(500)
//         .json({ isSuccess: false, message: "Internal server error" });
//     }
//   },

//   getChefDetailsandDishes: async (req, res) => {
//     try {
//       if (req.userType !== "manager") {
//         return res
//           .status(403)
//           .json({ isSuccess: false, message: "Unauthorized access" });
//       }

//       // Find all chefs and populate their dishes field
//       const chefs = await Cheff.find().populate("dis  hes");

//       // If no chefs are found
//       if (!chefs || chefs.length === 0) {
//         return res.status(404).json({
//           isSuccess: false,
//           response: {},
//           error: "No chefs found",
//         });
//       }

//       // Respond with all chef details including populated dishes
//       res.json({
//         isSuccess: true,
//         response: chefs,
//         error: false,
//       });
//     } catch (error) {
//       // Handle errors
//       console.error("Error fetching chefs details:", error);
//       res.status(500).json({
//         isSuccess: false,
//         response: {},
//         error: "Failed to fetch chefs details",
//       });
//     }
//   },

  // updateDishPrice: async (req, res) => {
  //   try {
  //     const { dishId, newPrice } = req.body;

  //     // Update the dish price
  //     const updatedDish = await dish.findByIdAndUpdate(
  //       dishId,
  //       { price: newPrice },
  //       { new: true }
  //     );

  //     if (!updatedDish) {
  //       return res.status(404).json({
  //         isSuccess: false,
  //         response: {},
  //         error: "Dish not found",
  //       });
  //     }

  //     res.json({
  //       isSuccess: true,
  //       response: updatedDish,
  //       error: null,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       isSuccess: false,
  //       response: {},
  //       error: error.message,
  //     });
  //   }
  // },

  // getUpdatedDishPrice: async (req, res) => {
  //   try {
  //     if (req.userType !== "manager") {
  //       return res
  //         .status(403)
  //         .json({ isSuccess: false, message: "Unauthorized access" });
  //     }

  //     // Find all dishes and select only the _id and price fields
  //     // const updatedDishes = await dish.find({}, 'dishesName price');
  //     const updatedDishes = await dish.find(
  //       { price: { $exists: true } },
  //       "dishesName price"
  //     );

  //     // If no dishes are found
  //     if (!updatedDishes || updatedDishes.length === 0) {
  //       return res.status(404).json({
  //         isSuccess: false,
  //         response: {},
  //         error: "No dishes found",
  //       });
  //     }

      
  //     res.json({
  //       isSuccess: true,
  //       response: updatedDishes,
  //       error: null,
  //     });
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error fetching updated dish prices:", error);
  //     res.status(500).json({
  //       isSuccess: false,
  //       response: {},
  //       error: "Failed to fetch updated dish prices",
  //     });
  //   }
  // },

//   createTodaysMenu: async (req, res) => {
//     try {
//       // Extract necessary data from the request body
//       const { chefId, dishId, category, stock, dishName } = req.body;

//       // Create a new instance of TodaysMenu
//       const newMenu = new todaysMenu({
//         chefId: chefId,
//         dishId: dishId,
//         category: category,
//         stock: stock,
//         dishName: dishName,
//       });

//       // Save the new menu item to the database
//       const savedMenu = await newMenu.save();

//       // Send a success response with the saved menu item
//       res.status(201).json({
//         isSuccess: true,
//         response: savedMenu,
//         error: null,
//       });
//     } catch (error) {
//       console.error("Error creating today's menu:", error);
//       res.status(500).json({
//         isSuccess: false,
//         response: {},
//         error: "Failed to create today's menu",
//       });
//     }
//   },
//   todaysMenu: async (req, res) => {
//     try {
//       // Get today's date
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

//       // Query today's menu items from the database
//       const todayMenu = await todaysMenu
//         .find({
//           createdAt: {
//             $gte: today, // Greater than or equal to today's date
//             $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than tomorrow's date
//           },
//         })
//         .populate({ path: "dish", options: { strictPopulate: false } });

//       // Send the response with today's menu items
//       res.status(200).json({
//         isSuccess: true,
//         response: todayMenu,
//         error: null,
//       });
//     } catch (error) {
//       console.error("Error fetching today's menu:", error);
//       res.status(500).json({
//         isSuccess: false,
//         response: {},
//         error: "Failed to fetch today's menu",
//       });
//     }
//   },

//   createTable: async (req, res) => {
//     try {
//       const { tableName } = req.body;
//       console.log(tableName);

//       const newTable = new table({
//         tableName,
//       });
//       const savedTable = await newTable.save();
//       res.status(201).json({
//         isSuccess: true,
//         response: savedTable,
//         error: null,
//       });
//     } catch (error) {
//       console.error("Error creating table:", error);
//       res.status(500).json({
//         isSuccess: false,
//         response: {},
//         error: "Failed to create table",
//       });
//     }
//   },
//   getTable: async (req, res) => {
//     try {
//       // Check if the authenticated user is a manager or Supplier
//       if (req.userType !== "manager" && req.userType !== "supplier") {
//         return res
//           .status(403)
//           .json({ isSuccess: false, message: "Unauthorized access" });
//       }

//       // Fetch table details
//       const tables = await table.find({}, {}); // Exclude any specific fields if needed
//       res.json({ success: true, tables });
//     } catch (error) {
//       console.error("Error fetching table details:", error);
//       res
//         .status(500)
//         .json({ isSuccess: false, message: "Internal server error" });
//     }
//   },
//   updateTable: async (req, res) => {
//     try {
//       // Check if the authenticated user is a manager or supplier
//       if (req.userType !== "supplier") {
//         return res
//           .status(403)
//           .json({ isSuccess: false, message: "Unauthorized access" });
//       }

//       const { tableName, isOccupied } = req.body;

//       // Find the table by name and update its occupancy status
//       const existingTable = await table.findOneAndUpdate(
//         { tableName },
//         { $set: { isOccupied: isOccupied } },
//         { new: true }
//       );

//       // Check if the table exists
//       if (!existingTable) {
//         return res.status(404).json({
//           isSuccess: false,
//           response: {},
//           error: "Table not found",
//         });
//       }

//       // Return the updated table
//       res.status(200).json({
//         isSuccess: true,
//         response: existingTable,
//         error: null,
//       });
//     } catch (error) {
//       console.error("Error updating table:", error);
//       res.status(500).json({
//         isSuccess: false,
//         response: {},
//         error: error.message,
//       });
//     }
//   },

//   createOrderList: async (req, res) => {
//     try {
//       const { tableName, chefId, dishName, quantity } = req.body;

//       const dishData = await dish.findOne({ dishesName: dishName });

//       const orderData = {
//         dishName,
//         price: dishData.price,
//         quantity,
//       };
//       // Creating a new order instance
//       const newOrder = new order({
//         tableName: tableName,
//         chefId: chefId,
//         orders: [orderData],
//         totalAmount: orderData.price * quantity,
//       });

//       // Saving the new order
//       const savedOrder = await newOrder.save();

//       // Update the stock for the newly created order
//       const updatedDish = await todaysMenu.findOneAndUpdate(
//         { dishName: dishName },
//         { $inc: { stock: -quantity } },
//         { new: true }
//       );

//       if (!updatedDish) {
//         console.error(`Failed to update stock for dish: ${dishName}`);
//         // Handle failure to update stock
//       }
//       if (updatedDish.stock === 0) {
//         console.log(
//           `The stock for dish ${dishName} is now zero. Marking as finished.`
//         );
//       }
//       // Sending the response
//       res.status(201).json({
//         isSuccess: true,
//         response: savedOrder,
//         error: null,
//       });
//     } catch (error) {
//       console.log("Failed to create order list ", error);
//       res.status(500).json({
//         isSuccess: false,
//         response: {},
//         error: "Failed to create order",
//       });
//     }
//   },

//   getOrderList: async (req, res) => {
//     try {
//       // Check if req.userType exists and is valid
//       if (
//         !req.userType ||
//         (req.userType !== "manager" &&
//           req.userType !== "supplier" &&
//           req.userType !== "chef")
//       ) {
//         return res
//           .status(403)
//           .json({ success: false, message: "Unauthorized access" });
//       }

//       //   // Respond with updated order list

//       const orders = await order.find({}, {});
//       res.json({ success: true, orders });
//     } catch (error) {
//       console.log("Failed fetching OrderList", error);
//       res.status(500).json({
//         success: false,
//         error: "Failed fetching order",
//       });
//     }
//   },

  // addFoodOrderList : async (req, res) => {
  //   try {
  //     // Check user type
  //     if (
  //       !req.userType ||
  //       (req.userType !== "manager" && req.userType !== "supplier")
  //     ) {
  //       return res
  //         .status(403)
  //         .json({ success: false, message: "Unauthorized access" });
  //     }
  
  //     // Extract necessary data from the request body
  //     const { orderId, dishName, quantity } = req.body;
      
  //     // Fetch the price of the dish from the database
  //     const dishData = await dish.findOne({ dishesName: dishName });
  
  //     // If no dish data found, return error
  //     if (!dishData) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Dish not found" });
  //     }
  
  //     // Calculate the total price of the order
  //     const totalPrice = dishData.price * quantity;
  
  //     // Update the order by pushing new order data to the orders array and adding totalPrice to totalAmount
  //     const updatedOrderData = await order.findByIdAndUpdate(
  //       { _id: orderId },
  //       {
  //         $push: { orders: { dishName, price: dishData.price, quantity } },
  //         $inc: { totalAmount: totalPrice }
  //       },
  //       { new: true } // To return the updated document
  //     );
  
  //     if (!updatedOrderData) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Order not found" });
  //     }
  
  //     res.status(200).json({
  //       success: true,
  //       message: "Order updated successfully",
  //       updatedOrderData,
  //     });
  //   } catch (error) {
  //     console.error("Error updating order:", error);
  //     res.status(500).json({ success: false, error: "Internal Server Error" });
  //   }
  // },



//   createOrderList: async (req, res) => {
//     try {
//       const { tableName, chefId, dishName, quantity } = req.body;
  
//       const dishData = await dish.findOne({ dishesName: dishName });
  
//       const orderData = {
//         dishName,
//         price: dishData.price,
//         quantity,
//       };
  
//       // Creating a new order instance with initial status set to 'pending'
//       const newOrder = new order({
//         tableName: tableName,
//         chefId: chefId,
//         orders: [orderData],
//         totalAmount: orderData.price * quantity,
//         orderStatus: 'pending', // Set initial status to 'pending'
//       });
  
//       // Saving the new order
//       const savedOrder = await newOrder.save();
  
//       // Update the stock for the newly created order
//       const updatedDish = await todaysMenu.findOneAndUpdate(
//         { dishName: dishName },
//         { $inc: { stock: -quantity } },
//         { new: true }
//       );
  
//       if (!updatedDish) {
//         console.error(`Failed to update stock for dish: ${dishName}`);
//         // Handle failure to update stock
//       }
//       if (updatedDish.stock === 0) {
//         console.log(
//           `The stock for dish ${dishName} is now zero. Marking as finished.`
//         );
//       }
//       // Sending the response
//       res.status(201).json({
//         isSuccess: true,
//         response: savedOrder,
//         error: null,
//       });
//     } catch (error) {
//       console.log("Failed to create order list ", error);
//       res.status(500).json({
//         isSuccess: false,
//         response: {},
//         error: "Failed to create order",
//       });
//     }
//   },
  
//   // Function to update order status to 'served'
//   orderServed: async (req, res) => {
//     try {
//       // Check user type
//       if (!req.userType || (req.userType !== "supplier")) {
//         return res.status(403).json({ success: false, message: "Unauthorized access" });
//       }
  
//       const { orderId } = req.body;
  
//       // Find the order by its ID and update its status to 'served'
//       const updatedOrder = await order.findOneAndUpdate(
//         { _id: orderId },
//         { $set: { orderStatus: 'served' } },
//         { new: true }
//       );
  
//       if (!updatedOrder) {
//         return res.status(404).json({ success: false, message: "Order not found" });
//       }
  
//       res.status(200).json({
//         success: true,
//         message: "Order status updated to served",
//         updatedOrder
//       });
//     } catch (error) {
//       console.error('Error updating status:', error);
//       res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//         error: error.message
//       });
//     }
//   }
// }  


  // }}