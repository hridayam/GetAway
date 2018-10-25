const mongoose = require('mongoose');
const Hotels = require('../models/hotel').Hotels;
const express = require('express');
const router = express.Router();

router.get('/all_hotels', async(req, res) => {
    try{
        Hotels.find({}, (err, hotels) => {
            if(err){
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
                })
            }
        });
    }
    catch(err) {
        res.status(400).json({
            success: false,
            msg: 'Failed to find any hotels with that name'
        });
    }
});

router.get('/find_all', async(req,res) => {
    let { city } = req.body;

    try {
        Hotels.find({ city }, (err,hotels) => {
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
    catch(err) {
        res.status(400).json({
            success: false,
            msg: 'Failed to find any hotels with that address'
        });
    }
});

module.exports = router;