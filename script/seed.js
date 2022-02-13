"use strict";

const {
  db,
  models: { User, Order, OrderItem, Product },
} = require("../server/db");
// const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));
const faker = require("faker");
const userData = require("./users");
const productData = require("./products");
const random = require("lodash/random");
const quantity = [1, 2, 3, 4];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all(userData.map((u) => User.create(u)));
  // create admin user to test auth
  const admin = await User.create({
    email: "admin@gmail.com",
    password: "123",
    firstName: "Admin",
    lastName: "User",
    role: "ADMIN",
    addressLine1: "425 Main Way",
    addressLine2: "6A",
    city: "New York",
    state: "NY",
    zipcode: "10017",
  });
  users.push(admin);

  // Creating Products
  const products = await Promise.all(productData.map((p) => Product.create(p)));

  // Creating Orders
  let orders = await Promise.all(
    users.map((u) => {
      return Order.create({
        userId: u.id,
        completedTimestamp: faker.date.past(),
      });
    })
  );
  orders = [
    ...orders,
    ...(await Promise.all(
      users.map((u, idx) => {
        if (idx % 3 === 0) {
          return Order.create({
            userId: u.id,
          });
        } else {
          return Order.create({
            userId: u.id,
            completedTimestamp: faker.date.past(),
          });
        }
      })
    )),
  ];

  // Attaching items to each order
  let orderItems = await Promise.all(
    orders.map((o) => {
      const product = products[random(0, products.length - 1)];
      return OrderItem.create({
        quantity: random(1, quantity.length - 1),
        price: product.price,
        orderId: o.id,
        productId: product.id,
      });
    })
  );
  orderItems = [
    ...orderItems,
    ...(await Promise.all(
      orders.map((o, idx) => {
        const product = products[random(0, products.length - 1)];
        if (idx % 2 === 0) {
          return OrderItem.create({
            quantity: random(1, quantity.length - 1),
            orderId: o.id,
            productId: product.id,
            price: product.price,
          });
        }
        if (idx % 3 === 0) {
          return OrderItem.create({
            quantity: random(1, quantity.length - 1),
            orderId: o.id,
            productId: product.id,
            price: product.price,
          });
        }
      })
    )),
  ];

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);
  return {
    users: {
      user1: users[0],
      user2: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
  // finally {
  //   console.log("closing db connection");
  //   await db.close();
  //   console.log("db connection closed");
  // }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
