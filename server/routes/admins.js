const Admin = require('../models/admins');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const config = require('../config/database');
const Reservation = require('../models/reservation');
const User = require('../models/users');

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ username }).exec();

        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if (err) {
                throw new Error(err);
            } else if (isMatch) {
                const adminToken = jwt.sign({data: {
                    _id: admin._id,
                    username: admin.username
                }}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                return res.status(200).json({
                    success: true,
                    msg: 'Successfully signed you on as admin',
                    admin,
                    adminToken
                });
            }
        });
    }
    catch(err) {
        return res.status(401).json({
            success: false,
            msg: 'You are not allowed to access this page!'
        });
    }
});

router.post('/create', async (req,res) => {
    let { username, password } = req.body;

    try {
        let newAdmin = new Admin({ username, password});

        Admin.createAdmin(newAdmin, (err, admin) => {
            if (err)
                return res.status(500).json({
                    success: false,
                    msg: 'Error when creating new admin.'
                });
            else if (admin)
                return res.status(200).json({
                    success: true,
                    msg: 'Successfully created a new admin'
                });
        })
    }
    catch(err) {
        return res.status(401).json({
            success: false,
            msg: 'You are not allowed to access this page!'
        });
    }
});

router.get('/data', (req,res) => {
    try {
        Reservation.find({}, (err, reservations) => {
            if (err) throw new Error(err);
            if (reservations) {
                User.find({}, (err, users) => {
                    if (err) throw new Error(err);
                    if (users)
                        return res.status(200).json({
                            success: true,
                            msg: 'Got all data',
                            reservations,
                            users
                        });
                });
            }
        });
    }
    catch(err) {
        return res.status(403).json({
            success: false,
            msg: 'Server error'
        });
    }
});

router.post('/edit-reservation', async (req,res) => {
    try {
        let { 
            _id,
            special_accomodations,
            number_of_guests,
            end_date
        } = req.body;

        let reservation = await Reservation.findOneAndUpdate({ _id }, { $set: { special_accomodations, number_of_guests, end_date }});

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

router.post('/cancel-reservation/:id', (req,res) => {
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
            Reservation.cancelReservation(reservation, (err, updatedReservation) => {
                if (err) return res.status(422).json({success: false, error: err});
                return res.status(200).json({
                    success: false,
                    msg: 'The reservation has been cancelled within the 24 hours that it starts'
                });
            });
        }
        
    })
});

module.exports = router;