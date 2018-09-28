const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt =  require('jsonwebtoken');
const bodyParser = require('body-parser');

const config = require('../config/database');
const User = require('../models/users');

//let locUser;

// get one user
router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next){
    res.status(200).json({user: {
        id:                 req.user._id,
        email:              req.user.email,
        name:               req.user.name,
        phoneNumber:        req.user.phoneNumber,
        address:            req.user.address,
        rewardsPoints:      req.user.rewardsPoints,
        profilePic:         req.user.profilePic
    }});
});

router.post('/register', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    // Validation
    req.checkBody('name', 'First Name is Required').notEmpty();
    req.checkBody('email', 'email is Required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('password', 'password is Required').notEmpty();
    req.checkBody('confirmPassword', 'passwords do not match').equals(req.body.password);
    req.checkBody('address', 'address is Required').notEmpty();
    req.checkBody('phoneNumber', 'phone number is Required').notEmpty();

    const errors = req.validationErrors();
    if(errors) {
        console.log(errors);
    } else {
        const newUser = new User({
            name: name,
            email: email,
            password: password,
            address: address,
            phoneNumber: phoneNumber
        });

        User.createUser(newUser, function(err, user){
            if(err) {
                res.status(500).json({success: false, msg: 'Failed to register User'});
                console.log(err)
            } else {
                res.status(200).json({success: true, msg: 'User Registered'});
            }
        });
        console.log('passed');
    }
});



router.post('/login', (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, function(err, user){
        if (err) throw err;
        if(!user){
            return res.status(500).json({success: false, msg: 'Either email or password is incorrect'})
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if(isMatch) {
                const token = jwt.sign({data: {
                    _id: user._id,
                    role: user.role
                }}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                //console.log("logged in");
                res.status(200).json({
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                        rewardsPoints: user.rewardsPoints,
                        profilePic: user.profilePic
                    }
                })
            } else {
                return res.status(500).json({success: false, msg: 'Either email or password is incorrect'});
            }
        });
    });
});

//no need
router.put('/connect', passport.authenticate('jwt', {session: false}), function(req, res, next){
    if (req.user.role.toLowerCase() == 'applicant') {
        return res.status(401).json({
            error: "only employer can create a connection"
        });
    }

    const applicantID = req.body.id;
    User.addConnection(req.user._id, applicantID,(error) => {
        if (error) 
        res.status(500).json ({
            error: error
        });
    }, (err, user) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                message: "added a connection"
            });
        }
    });
});

// no need
router.get('/connections', passport.authenticate('jwt', {session: false}), function(req, res, next){
    var users = [];
    User.getConnections(req.user._id, function(users) {
        if (users ==  null) {
            res.status(500).json({
                error: "cannot find users" 
            })
        } else {
            res.status(200).json({
                users: users
            });
        }
    });
});

module.exports = router;