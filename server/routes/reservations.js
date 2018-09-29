const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation');

// gets all the reservations made by user
// front end makes request with user id
// back end sends back array of reservations
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

// delete a reservation made by the user
// front end makes a request with the user id and reservation id
// back end responds with 200 for successful deletion, and 500 for unsuccessful deletion
router.post('/delete/:user_id', async (req,res) => {
    try {
        let { user_id } = req.params;
        let { _id } = req.body;

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

// cancel a reservation made by the user identified by the user_id
// front end makes a request 
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
});

module.exports = router;