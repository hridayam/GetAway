const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation');

router.get('/api/get/reservations/:user_id', async (req,res) => {
    try {
        let { user_id } = req.params;

        Reservation.find({ user_id }, (err, data) => {
            if (err) 
                res.status(400).json({
                    success: false,
                    msg: err
                });
            else if (data)
                res.status(200).json({
                    success: true,
                    msg: 'Successfuly found reservations from the user'
                });
        });
    }
    catch {
        res.status(500).json({
            success: false,
            err: 'Error occured! Please try again.' 
        });
    }
});

router.post('/api/post/reservations/delete/:user_id', async (req,res) => {
    try {
        let { user_id } = req.params;
        let { time_created } = req.body;

        await Reservation.findOneAndRemove({ user_id, time_created }).exec();

        res.status(200).json({
            success: true,
            msg: 'Successfully deleted the reservation.'
        });
    }
    catch {
        res.status(500).json({
            success: false,
            err: 'Error occured! Please try again.' 
        });
    }
});


module.exports = router;