const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation');

router.get('/reservations/all/:user_id', async (req,res) => {
    try {
        let { user_id } = req.params;

        Reservation.find({ user_id }, (err, data) => {
            if (err.name === "CastError") 
                res.status(400).json({
                    success: false,
                    msg: `${err.value} is an invalid user ID. Try again.`
                });
            else if (data)
                res.status(200).json({
                    success: true,
                    msg: 'Successfuly found reservations from the user'
                });
        });
    }
    catch(err) {
        res.status(500).json({
            success: false,
            err: 'Error occured! Please try again.' 
        });
    }
});

// jkgki
router.post('reservations/delete/:user_id', async (req,res) => {
    try {
        let { user_id } = req.params;
        let { time_created } = req.body;

        await Reservation.findOneAndRemove({ user_id, time_created }).exec();

        res.status(200).json({
            success: true,
            msg: 'Successfully deleted the reservation.'
        });
    }
    catch(err) {
        res.status(500).json({
            success: false,
            err: 'Error occured! Please try again.' 
        });
    }
});

// update reservation/ delete and create new one
// 24 hrs for free, full fee after that until a week before,

module.exports = router;