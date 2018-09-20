const express = require('express');
const router = express.Router();

const reservations = require('./reservations');

router.use(reservations);

router.get('/', function(req, res, next){
    res.json({
        message: "hello world"
    });
});

module.exports = router;