const Table = require("../models/tablesModel");

module.exports = {
  createTableHelper: async (tableData) => {
    const newTable = new Table(tableData);
    return await newTable.save();
  },

  getTableHelper: async () => {
    return await Table.find({}, {});
  },

  updateTableHelper: async (tableName, isOccupied) => {
    return await Table.findOneAndUpdate(
      { tableName },
      { $set: { isOccupied: isOccupied } },
      { new: true }
    );
  },
};
