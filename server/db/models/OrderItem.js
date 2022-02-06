const Sequelize = require("sequelize");
const { INTEGER, STRING } = Sequelize;
const db = require("../db");

const OrderItem = db.define("orderItem", {
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
