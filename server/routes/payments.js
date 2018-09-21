const express = require('express');
const router = express.Router();
const uuid = require('uuid/')
var keys = require('../config/stripe');
var stripe = require('stripe')(keys.secret_key);

router.post('/pay', function(req, res) {
    res.json({
        hello: 'world'
    })
})

module.exports = router;