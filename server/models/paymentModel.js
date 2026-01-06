const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentCollection = () => getDB().collection("payments");
const cartCollection = () => getDB().collection("carts")


const paymentsModel = {
  async paymentCheckoutSession(paymentInfo) {
    const { amount } = paymentInfo;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Please pay for this foods.",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: paymentInfo,
      customer_email: paymentInfo.buyersEmail,
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/payment-cancel`,
    });


    return { url: session.url };
  },
  async paymentSuccess(sessionId, cart) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const transactionId = session.payment_intent;

    if(cart.length ===0) return {message: "Cart is empty!", transactionId, metadata: session.metadata} 

    const isPaymentExist = await paymentCollection().findOne({
      transactionId,
    });

    if(isPaymentExist) {
      return { message: "Payment already processed!", transactionId, metadata: session.metadata };
    }

    const data = await paymentCollection().insertOne({
      transactionId,
      cart,
      buyersEmail: session.customer_email,
      buyersName: session.metadata.buyersName,
      amount: parseInt(session.metadata.amount),
      paymentTime: new Date(),
    });

     await cartCollection().deleteMany({buyersEmail: session.customer_email})

    return { transactionId, metadata: session.metadata, data };

  },

  async userPayments(userEmail){
    const payments = await paymentCollection().find({buyersEmail: userEmail}).toArray();
    console.log(payments)
    return payments;
  }
};

module.exports = { paymentsModel };