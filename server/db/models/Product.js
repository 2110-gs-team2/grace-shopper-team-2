const { ENUM } = require("sequelize");
const Sequelize = require("sequelize");
const { STRING, DECIMAL, INTEGER, UUID, UUIDV4, BOOLEAN } = Sequelize;
const db = require("../db");

const Product = db.define("product", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DECIMAL(20, 2),
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  size: {
    type: ENUM(["x-small", "small", "medium", "large"]),
  },
  isPetFriendly: {
    type: BOOLEAN,
  },
  light: {
    type: ENUM(["low", "indirect", "direct"]),
  },
  difficulty: {
    type: ENUM(["easy", "moderate", "expert"]),
  },
});

module.exports = Product;
