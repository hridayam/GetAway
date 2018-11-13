const mongoose = require('mongoose');
const Hotels = require('../models/hotel').Hotels;
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

<<<<<<< HEAD
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
=======
const findHotels = (params,res) => {
    Hotels.find(params, (err,hotels) => {
        if (err) {
            res.status(500).json({
                success: false,
                msg: err
            });
        }
        else if (hotels) {
            res.status(200).json({
                success: true,
                msg: 'Found the hotels!',
                hotels
            });
        }
    });
}
>>>>>>> e891c456e64f51f9afb933051a61e3eb36b5e0ef

module.exports = router;