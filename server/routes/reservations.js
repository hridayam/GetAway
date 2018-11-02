const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation');

// gets all the reservations made by user
// front end makes request with user id
// back end sends back array of reservations

router.get('/all', async (req,res) => {
    try {
        let { user_id } = req.body;

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

// delete a reservation made by the user
// front end makes a request with the user id and reservation id
// back end responds with 200 for successful deletion, and 500 for unsuccessful deletion
router.post('/delete', async (req,res) => {
    try {
        let { _id, user_id } = req.body;

        await Reservation.findOneAndRemove({ user_id, _id }).exec();

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

// update a reservation made by the user
// front end makes a request with the user id in the parameter and put reservation object inside the request
// backend responds with 200 for successful update or 400 for unsuccessful update
router.post('/update', async (req,res) => {
    try {
        let { reservation, user_id } = req.body;

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

// cancel a reservation made by the user identified by the user_id
// front end makes a request 
// 24 hrs for free, full fee after that until a week before
router.post('/cancel', async (req,res) => {
    let { _id, user_id } = req.body;

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
});

router.post('/create', async (req,res) => {
    let { 
        user_id,
        hotel, city, startDate, endDate, numGuests,
        subtotal, tax, total, rewardsPointsEarned
    } = req.body;

    try {
        let reservation = new Reservation({
            user_id,
            hotel, city, numGuests,
            startDate, endDate,
            subtotal, tax, total, rewards_points_earned: rewardsPointsEarned
        })

        reservation.save((err, reservation, numAffected) => {
            if (err)
                res.status(400).json({
                    success: false,
                    msg: err
                });
            else if (reservation)
                res.status(200).json({
                    success: true,
                    reservation,
                    msg: 'Successfully created the reservation.'
                });
        });
    }
    catch(err) {
        res.status(400).json({
            success: false,
            msg: err
        });
    }
});

module.exports = router;