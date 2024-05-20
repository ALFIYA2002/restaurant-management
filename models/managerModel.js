const mongoose = require("mongoose");

const manager = mongoose.Schema({
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
  }
});
const Manager = mongoose.model("Manager", manager);

module.exports = Manager;