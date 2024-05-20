const mongoose = require("mongoose");

const casher = mongoose.Schema({
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

  },userType:{
    type:String
    },
  deleted:{
    type:Boolean
  }
});
const Casher = mongoose.model("Casher", casher);

module.exports = Casher;