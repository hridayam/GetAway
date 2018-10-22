const mongoose = require('mongoose');
const Hotels = mongoose.model('Hotels');
const express = require('express');
const router = express.Router();

router.get('/find_all', async(req,res) => {
    let { address } = req.body;

    try {
        let hotels = await Hotels.find({
            
        })
    }
    catch(err) {
        res.status(400).json({
            success: false,
            msg: 'Failed to find any hotels with that address'
        });
    }
});