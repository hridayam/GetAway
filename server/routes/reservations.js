const express = require('express');
const router = express.Router();
const passport = require('passport');

const Reservation = require('../models/reservation');
const User = require('../models/users');

// gets all the reservations made by user
// front end makes request with user id
// back end sends back array of reservations
router.get('/all', passport.authenticate('jwt', {session: false}),async (req,res) => {
    let user_id  = req.user._id;

    Reservation.getAllReservationsByOneUser(user_id, (err, data) => {
        if(err) {
            return res.status(422).json({
                success: false,
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Successfuly found reservations from the user',
            data: data
        })

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
router.put('/cancel/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    let { id } = req.params;

    Reservation.findById(id, (err, reservation) => {
        if (err) return res.status(422).json({success: false, error: err});
        console.log(Date.now().valueOf(), reservation.time_created, reservation.start_date);
        if (Date.now().valueOf() - reservation.time_created < 86400000) 
        {
            Reservation.cancelReservation(reservation, (err, updatedReservation) => {
                if (err) return res.status(422).json({success: false, error: err});
                return res.status(200).json({
                    success: true,
                    charge: false
                });
            })
        } else if (Date.now().valueOf() - reservation.time_created > 86400000 && 
                    Date.now().valueOf() - reservation.start_date > 86400000) {
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

router.post('/create', passport.authenticate('jwt', {session: false}), async (req,res) => {
    let data = { 
        hotel_id,
        time_created,
        start_date,
        end_date,
        charge,
        room_number,
        number_of_guests,
        user,
    } = req.body;
    
    let reservation = new Reservation(data)

    Reservation.createReservation(reservation, (err, reservation) => {
        if(err) {
            console.log(err);
            return res.status(422).json({
                success: false,
                message: err
            })
        }
        else if (reservation) {
            return res.status(200).json({
                success: true,
                reservation,
                msg: 'Successfully created the reservation.'
            });
        }
    })
});

module.exports = router;