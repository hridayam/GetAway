const express = require('express');
const router = express.Router();

var keys = require('../config/stripe');
var stripe = require('stripe')(keys.secret_key);

router.post('/pay')