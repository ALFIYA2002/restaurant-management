const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const managerModel = require("../models/managerModel");
const casherModel = require('../models/casherModer')
const chefModel = require("../models/cheffModel");
const supplierModel = require("../models/supplierModel");
const Dish = require('../models/fooddishesModel')
module.exports = {
   registerManagerHelper: (requestData) => {
    return new Promise(async (resolve, reject) => {
      const check = await managerModel.findOne({ email: requestData.email }); //Check if Email Already Exists


      if (check) {
        const response = {
          success: false,
          data: "this email is taken try another one",
        };
        reject(response);
        
      } else {
  
        const hashedPassword = await bcrypt.hash(requestData.password, 10);
        let insertData  = {
          name: requestData.name,
          email: requestData.email,
          password: hashedPassword,
          userType:requestData.userType,
          deleted:requestData.deleted
        };
        switch(requestData.userType){
          case 'manager': 
        }
        const dbResponse = await managerModel.create(insertData);

        if (dbResponse) {
          const response = {
            success: true,
            data: dbResponse,
          };
          resolve(response);
        } else {
          const response = {
            success: false,
            data: dbResponse,
          };

        }
      }
    });
  },
  loginUserHelper: (requestData) => {
    return new Promise(async (resolve, reject) => {
      let userData;
      switch (requestData.userType) {
        case 'manager':
          userData = await managerModel.findOne({email:requestData.email});
          break;
        case 'casher':
          userData = await casherModel.findOne({email:requestData.email});
          break;
        case 'chef':
          userData = await chefModel.findOne({email:requestData.email});
          break;
        case 'supplier':
          userData = await supplierModel.findOne({email:requestData.email});
          break;
        default:
          const response = {
            success: false,
            data: "Invalid userType.",
          };
          reject(response);
          return; 
      }
      if (!userData) {
        const response = {
          success: false,
          data: "User not found or account no longer available",
        };
        reject(response);

      } else {
        const loginPassord = await bcrypt.compare(
          requestData.password,
          userData.password,
        
        );
        if (!loginPassord) {
          const response = {
            success: false,
            data: "Invalid password",
          };
          reject(response);
        }else{
        
            const token = await jwt.sign({
          _id:userData._id,
          userType:userData.userType
          },process.env.SECRET_JWT )
          
          const response =  {
            success: true,
            data:"login success",
            token: token 
          }; 
          resolve(response)

          
        
      }
    
  }})
  },
  createUserHelper: (requestData) => {
    return new Promise(async (resolve, reject) => {
      if(requestData.type!='manager'){
        const response = {
          success: false,
          data: "Not accessable.",
        };
        reject(response);
        return; 
      }
      const managerUser = await managerModel.findOne({ email: requestData.email });
      const casherUser = await casherModel.findOne({ email: requestData.email });
      const chefUser = await chefModel.findOne({ email: requestData.email });
      const supplierUser = await supplierModel.findOne({ email: requestData.email });

      if (managerUser || casherUser || chefUser || supplierUser) {
        const response = {
          success: false,
          data: "This email is already taken. Please try another one.",
        };
        reject(response);
        return; 
      
      } else {
  
        const hashedPassword = await bcrypt.hash(requestData.password, 10);
        let insertData  = {
          name: requestData.name,
          email: requestData.email,
          password: hashedPassword,
          userType:requestData.userType,
          deleted:requestData.deleted
        };
        let dbResponse;
        switch (requestData.userType) {
          case 'manager':
            dbResponse = await managerModel.create(insertData);
            break;
          case 'casher':
            dbResponse = await casherModel.create(insertData);
            break;
          case 'chef':
            dbResponse = await chefModel.create(insertData);
            break;
          case 'supplier':
            dbResponse = await supplierModel.create(insertData);
            break;
          default:
            const response = {
              success: false,
              data: "Invalid userType.",
            };
            reject(response);
            return; 
        }

        if (dbResponse) {
          const response = {
            success: true,
            data: dbResponse,
          };
          resolve(response);
        } else {
          const response = {
            success: false,
            data: dbResponse,
          };

        }
      }
    });
  }}
  
//   createDishHelper: async (dishData) => {
//     try {
//       // Create a new dish instance
//       const newDish = new Dish({
//         dishesName: dishData.dishesName,
//         cuisine: dishData.cuisine,
//         price: dishData.price,
//         deleted: dishData.deleted,
//         chefId: dishData.chefId
//       });

//       // Save the dish to the database
//       const savedDish = await newDish.save();
//       await chefModel.findByIdAndUpdate(dishData.chefId, { $push: { dishes: savedDish._id } });

//       return {
//         success: true,
//         data: savedDish
//       };
//     } catch (error) {
//       return {
//         success: false,
//         data: error.message
//       };
//     }
//   }
// } 
