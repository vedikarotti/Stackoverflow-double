import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import Stripe from "stripe";
import { getUserByEmailId, updateUserById } from "./controllers/users.js";
import users from "./models/auth.js";

const app = express();
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.STRIPE_WHSEC_KEY;

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

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
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
  }
);

app.get("/webhook", (req, res) => {
  res.send("This is a stack overflow clone API - Webhook Endpoint");
});

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

const PORT = process.env.PORT || 8123;

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
