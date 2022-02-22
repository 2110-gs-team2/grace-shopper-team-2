//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const Order = require("./models/Order");
const Product = require("./models/Product");
const OrderItem = require("./models/OrderItem");
const Review = require("./models/Review");

// a user and order have a one-to-many relationship
Order.belongsTo(User);
User.hasMany(Order);

//an order and orderitem have a one-to-many relationship
OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

//a product and orderItem have a one-to-many relationship
OrderItem.belongsTo(Product);

//a user and review have a one-to-many relationship
User.hasMany(Review);
Review.belongsTo(User);

//a product and review have a one-to-many relationship
Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Order,
    OrderItem,
    Product,
    Review,
  },
};
