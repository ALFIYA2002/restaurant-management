const tableHelper = require("../helpers/tableHelper");

module.exports = {
  createTable: async (req, res) => {
    try {
      const tableData = { tableName: req.body.tableName };
      const savedTable = await tableHelper.createTableHelper(tableData);
      res.status(201).json({
        isSuccess: true,
        response: savedTable,
        error: null,
      });
    } catch (error) {
      console.error("Error creating table:", error);
      res.status(500).json({
        isSuccess: false,
        response: {},
        error: "Failed to create table",
      });
    }
  },

  getTable: async (req, res) => {
    try {
      if (req.userType !== "manager" && req.userType !== "supplier") {
        return res
          .status(403)
          .json({ isSuccess: false, message: "Unauthorized access" });
      }
      const tables = await tableHelper.getTableHelper();
      res.json({ success: true, tables });
    } catch (error) {
      console.error("Error fetching table details:", error);
      res
        .status(500)
        .json({ isSuccess: false, message: "Internal server error" });
    }
  },

  updateTable: async (req, res) => {
    try {
      if (req.userType !== "supplier") {
        return res
          .status(403)
          .json({ isSuccess: false, message: "Unauthorized access" });
      }
      const { tableName, isOccupied } = req.body;
      const updatedTable = await tableHelper.updateTableHelper(tableName, isOccupied);
      if (!updatedTable) {
        return res.status(404).json({
          isSuccess: false,
          response: {},
          error: "Table not found",
        });
      }
      res.status(200).json({
        isSuccess: true,
        response: updatedTable,
        error: null,
      });
    } catch (error) {
      console.error("Error updating table:", error);
      res.status(500).json({
        isSuccess: false,
        response: {},
        error: error.message,
      });
    }
  },
};
