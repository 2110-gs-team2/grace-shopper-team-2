const stripe = require("stripe")(
  "sk_test_51KTcZ8G6iunwbpRuD6b5urjJ7kMQbMCgf2slTP93kRETgWSK42hNEZ4KrZ1TSvVdhT3wVXt93vRTGWuuuzGizvfZ00zOFSNdoh"
);
const app = require("express").Router();
module.exports = app;

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
