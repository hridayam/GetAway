const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

const uuid = require('uuid/')
var keys = require('../config/stripe');
var stripe = require('stripe')(keys.secret_key);

router.post('/pay', function(req, res) {
    let { amount, currency, source, user_id, customer } = req.body;
    const destination = {
        account: "acct_1DCutGGZF8qeVOU9"
    };

    stripe.charges.create({
        amount,
        currency,
        source,
        description: '',
        customer
    }, (err, charge) => {
        if (err) 
            return res.status(400).json({ success: false, msg: err });

        charge.user_id = user_id;
        stripe.charges.create(charge, (err,response) => {
            if (err) 
                return res.status(400).json({ success: false, msg: err });
            else
                return res.status(200).json({ success: true, msg: 'Successfully charged the customer' });
        });
    });
});

module.exports = router;