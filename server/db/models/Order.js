const Sequelize = require("sequelize");
const { DATE, UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const Order = db.define("order", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  completedTimestamp: {
    type: DATE,
  },
});

module.exports = Order;
