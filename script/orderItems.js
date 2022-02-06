const random = require("lodash/random");
const quantity = [1, 2, 3, 4];

const arr = new Array(50).fill({ quantity: 0 });
const orderItems = arr.map((item) => {
  return { quantity: quantity[random(0, quantity.length - 1)] };
});

module.exports = orderItems;
