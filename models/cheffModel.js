const mongoose = require("mongoose");

const cheff = mongoose.Schema({
  name: {
    type: String

  },
  email: {
    type: String

  },
  mobile: {
    type: String

  },
  password: {
    type: String

  },
  
  userType:{
    type:String
    },
    deleted:{
      type:Boolean
    } ,
     dishes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish' // Referring to the Dish model
    }],  createdAt: {
      type: Date,
      default: Date.now
    }
  });
  

  

const Cheff = mongoose.model("Cheff", cheff);

module.exports = Cheff;