const Sequelize = require("sequelize");
const { INTEGER } = Sequelize;
const db = require("../db");

const OrderItem = db.define("orderItem", {
  id: {
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  size: {
    type: STRING,
    allowNull: false,
    defaultValue: "small",
  },
});

module.exports = OrderItem;
