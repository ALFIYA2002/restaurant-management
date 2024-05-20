const mongoose = require("mongoose");

const supplier = mongoose.Schema({
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
const Supplier = mongoose.model("Supplier", supplier);

module.exports = Supplier;