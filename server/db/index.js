//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const Order = require("./models/Order");
const Product = require("./models/Product");
const OrderItem = require("./models/OrderItem");

// a user and order have a one-to-many relationship
Order.belongsTo(User);
User.hasMany(Order);

//an order and orderitem have a one-to-many relationship
OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

//a product and orderItem have a one-to-many relationship
OrderItem.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Order,
    OrderItem,
    Product,
  },
};
