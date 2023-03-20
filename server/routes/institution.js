const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
	key_id: 'rzp_test_DVBH252dUcCnLO',
	key_secret: 'W9Dfgd9qkahaNmxGF4eIX9VQ'
})
router.post('/razorpay', async (req, res) => {
	const amount = 400
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})



module.exports = router;
