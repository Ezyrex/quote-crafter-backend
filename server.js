
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-customer-portal-session', async (req, res) => {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: req.body.customerId,
      return_url: 'https://your-frontend.netlify.app',
    });
    res.send({ url: session.url });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Backend server running on port', PORT);
});
