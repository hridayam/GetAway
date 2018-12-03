const express = require('express');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');
sgMail.setSubstitutionWrappers("{{", "}}");

const Reservation = require('../models/reservation');
const User = require('../models/users');

// gets all the reservations made by user
// front end makes request with user id
// back end sends back array of reservations

router.post('/all', async (req,res) => {
    let { email }   = req.body;

    Reservation.getAllReservationsByOneUser(email, (err, data) => {

        if(err) {
            return res.status(422).json({
                success: false,
                error: err
            });
        }
        if (data) {
            return res.status(200).json({
                success: true,
                msg: 'Successfuly found reservations from the user',
                reservations: data
            });
        }

    });
});

//get one reservation based on ID
router.get('/reservation/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const id = req.params.id;

    Reservation.getReservationById(id, (err, reservation) => {
        if (err) return res.status(422).json({
            success: false,
            error: err
        })

        return res.status(200).json({
            success: true,
            reservation,
            message: 'successfully retreived reservation'
        })
    })
});

// delete a reservation made by the user
// front end makes a request with the user id and reservation id
// back end responds with 200 for successful deletion, and 500 for unsuccessful deletion
// router.post('/delete', async (req,res) => {
//     try {
//         let { _id, user_id } = req.body;

//         await Reservation.findOneAndRemove({ user_id, _id }).exec();

//         res.status(200).json({
//             success: true,
//             msg: 'Successfully deleted the reservation.'
//         });
//     }
//     catch(err) {
//         res.status(500).json({
//             success: false,
//             err: 'Error occured! Please try again.' 
//         });
//     }
// });

// update a reservation made by the user
// front end makes a request with the user id in the parameter and put reservation object inside the request
// backend responds with 200 for successful update or 400 for unsuccessful update
router.post('/edit', async (req,res) => {
    try {
        let { 
            _id,
            special_accomodations,
            number_of_guests
        } = req.body;

        let reservation = await Reservation.findOneAndUpdate({ _id }, { $set: { special_accomodations, number_of_guests }});

        return res.status(200).json({
            success: true,
            msg: 'Successfully updated the reservation',
            reservation
        });
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            err
        });
    }
});



// cancel a reservation made by the user identified by the user_id
// front end makes a request 
// 24 hrs for free, full fee after that until a week before
router.post('/cancel/:id', (req,res) => {
    let { id } = req.params;

    Reservation.findById(id, (err, reservation) => {
        if (err) return res.status(422).json({success: false, error: err});
        console.log(Date.now().valueOf() - reservation.start_date);
        if (Date.now().valueOf() - reservation.time_created < 86400000 &&
            reservation.start_date - Date.now().valueOf() > 86400000) 
        {
            Reservation.cancelReservation(reservation, (err, updatedReservation) => {
                if (err) return res.status(422).json({success: false, error: err});
                return res.status(200).json({
                    success: true,
                    charge: false
                });
            })
        } else if (Date.now().valueOf() - reservation.time_created > 86400000 && 
            reservation.start_date - Date.now().valueOf() > 86400000) {
            Reservation.cancelReservation(reservation, (err, updatedReservation) => {
                if (err) return res.status(422).json({success: false, error: err});
                return res.status(200).json({
                    success: true,
                    charge: true
                });
            })
        } else {
            return res.status(200).json({
                success: false,
                msg: 'Unable to cancel the reservation. You need to cancel the reservation 24 hours before it starts.'
            });
        }
        
    })
});

router.post('/create', async (req,res) => {
    let data = { 
        hotel_id, time_created, start_date, end_date,
        charge, room_number, number_of_guests,
        user, total, subtotal, tax, rewardsPoints,
        usingRewards, city, hotel_name, special_accomodations
    } = req.body;
       
    let reservation = new Reservation(data);
    Reservation.createReservation(reservation, (err, reservation) => {
        if(err) {
            console.log(err);
            return res.status(422).json({
                success: false,
                message: err
            });
        }
        else if (reservation) {
            sendEmail(reservation)
            delete reservation.hotel;
            return res.status(200).json({
                success: true,
                reservation,
                msg: 'Successfully created the reservation.'
            });
        }
    });
});

const sendEmail = (reservation) => {
    const { user, hotel, start_date, end_date } = reservation;
    const { address } = hotel;
    const msg = {
        to: user.email,
        from: 'no-reply@getaway.io',
        templateId: 'd-3c9da0db51ca4d699872c31d46a0a1e1',
        personalizations: [
            {
                to: [
                    {
                        email: user.email
                    }
                ],
                dynamic_template_data: {
                    username: user.name,
                    hotelName: hotel.name,
                    street: address.streetName,
                    city: address.city,
                    state: address.state,
                    zip: address.zipcode,
                    date: `${moment(start_date).format('MMM Do YYYY')} - ${moment(end_date).format('MMM Do YYYY')}`,
                    subject: 'Reservation Confirmation',
                }
            }
        ]
    };

    sgMail.send(msg)
    .then( () => {
        console.log('email sent')
    })
    .catch(
        (err) => {
            console.log(err);
    });
}


module.exports = router;