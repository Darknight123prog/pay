const express = require("express");
const router = express.Router();
const gateway = require("../config/braintree");
const OrderModel = require("../models/OrderModel");

// Token
router.get("/token", async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.json({ clientToken: response.clientToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payment
router.post("/pay", async (req, res) => {
  console.log("Payment body:", req.body);
  const { nonce, amount } = req.body;

  if (!nonce || !amount) {
    return res.status(400).json({ error: "Invalid payment data" });
  }

  try {
    const result = await gateway.transaction.sale({
      amount,
      paymentMethodNonce: nonce,
      options: { submitForSettlement: true },
    });
    // console.log(result);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }


    const {User,ProductsName}=req.body;
    //creating the Order
    await OrderModel.create({
        amount:Number(amount),
        User,
        ProductsName,
       trancactionId:result.transaction.id
    })
    

    res.json({
      success: true,
      transactionId: result.transaction.id,
      status: result.transaction.status,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
