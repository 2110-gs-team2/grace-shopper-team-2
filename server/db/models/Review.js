const Sequelize = require("sequelize");
const { DATE, UUID, UUIDV4, TEXT } = Sequelize;
const db = require("../db");

const Review = db.define("review", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  reviewText: {
    type: TEXT,
  },
});

module.exports = Review;
