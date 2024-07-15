const { bookingService } = require("../services");
const { tryCatch } = require("../utils");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeController = {};

stripeController.createIntent = tryCatch(async (req, res) => {
  const { bookingId } = req.params;
  console.log("bookingId", bookingId);
  const bookingData = await bookingService.getBookingById(+bookingId);

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "THB",
    amount: bookingData.totalPrice * 100,
    automatic_payment_methods: { enabled: true, allow_redirects: "never" },
  });

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = stripeController;
