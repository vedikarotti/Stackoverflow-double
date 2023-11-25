import users from "../models/auth.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.STRIPE_WHSEC_KEY;

export const postWebhook = async (request, response) => {
  const payload = request.body;
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      }
    );

    const lineItems = {
      lineItems: sessionWithLineItems.line_items.data,
      customerEmail: sessionWithLineItems.customer_details.email,
    };

    // Fulfill the purchase...
    findUserAndUpdate(lineItems);
  }
  response.status(200).end();
};

export const getWebhook = async (req, res) => {
  try {
    res.send("This is sample webhook test endpoint.");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const findUserAndUpdate = async (userDetails) => {
  // TODO: fill me in
  console.log("Fulfilling order", userDetails);
  const email = userDetails.customerEmail;

  await users.findOneAndUpdate(
    { email },
    { $set: { subscriptionPlan: userDetails.lineItems[0].description } },
    { new: true }
  );

  const userData = await users.findOne({ email });

  console.log("userData", userData);
};
