const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation');

router.get('/all/:user_id', async (req,res) => {
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
router.post('/delete/:user_id', async (req,res) => {
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


router.post('/update/:user_id', async (req,res) => {
    try {
        let { user_id } = req.params;
        let { reservation } = req.body;

        await Reservation.findOneAndUpdate({ _id: reservation._id }, { $set: { ...reservation }});

        res.status(200).json({
            success: true,
            msg: 'Successfully updated the reservation'
        });
    }
    catch(err) {
        res.status(400).json({
            success: false,
            err
        });
    }
});

// 24 hrs for free, full fee after that until a week before
router.post('/cancel/:user_id', async (req,res) => {
    let { user_id } = req.params;
    let { _id } = req.body;

    try {
        let reservation = await Reservation.findOne({ _id }).exec();

        if (reservation !== null) {
            if (Date.prototype.getTime() - reservation.time_created < 86400000 && reservation.time_created < reservation.start_time - 604800000) {
                res.status(200).json({
                    success: true,
                    charge: false
                });
            }
            else if (Date.prototype.getTime() - reservation.time_created < 86400000) {
                res.status(200).json({
                    success: true,
                    charge: true
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    msg: 'Unable to cancel the reservation. You need to cancel the reservation 24 hours before it starts.'
                });
            }
        }
    }
    catch(err) {
        res.status(400).json({
            success: false,
            err
        });
    }
})
module.exports = router;