const mongoose = require('mongoose');
const Hotels = require('../models/Hotels');
const express = require('express');
const router = express.Router();

router.get('/find_all', async(req,res) => {
    let { city } = req.body;

    try {
        let hotels = await Hotels.find({ city }, (err,res) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: err
                });
            }
            else if (res) {
                res.status(200).json({
                    success: true,
                    msg: 'Found the hotels!',
                    hotels: res
                })
            }
        });
    }
    catch(err) {
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