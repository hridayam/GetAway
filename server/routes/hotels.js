const mongoose = require('mongoose');
const Hotels = require('../models/hotels');
const express = require('express');
const router = express.Router();

// get all the hotels from the database
router.get('/all', async(req, res) => {
    try{
        findHotels({}, res);
    } catch(err) {
        res.status(400).json({
            success: false,
            msg: 'Failed to find any hotels with that name'
        });
    }
});

router.post('/search', async(req,res) => {
    let { city } = req.body;

    try {
        findHotels({ 'address.city': new RegExp(city, 'i') }, res);
    } catch(err) {
        res.status(400).json({
            success: false,
            msg: 'Failed to find any hotels with that address'
        });
    }
});

router.get('/generate_random_hotel', async(req,res) => {
    try {
        Hotels.createHotels(null, (err, res) => {
            console.log(err)
        });
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;