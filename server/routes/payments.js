const express = require('express');
const router = express.Router();
const uuid = require('uuid/')
var keys = require('../config/stripe');
var stripe = require('stripe')(keys.secret_key);

router.post('/pay', function(req, res) {
    let { amount, currency, source, user_id } = req.body;
    const destination = {
        account: "acct_1DCutGGZF8qeVOU9"
    };

    stripe.charges.create({
        amount,
        currency,
        source,
        description: ''
    }, (err, charge) => {
        
    });
})

module.exports = router;