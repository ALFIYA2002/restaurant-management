
const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableName: {
    type: String
  },
  isOccupied: {
    type: Boolean,
    default: false // Default value is false, indicating the table is initially unoccupied
  }

});
const table = mongoose.model("Table", tableSchema);

module.exports = table;