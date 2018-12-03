const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt =  require('jsonwebtoken');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const axios = require('axios');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');
sgMail.setSubstitutionWrappers("{{", "}}");

const config = require('../config/database');
const User = require('../models/users');


// get one user
router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next){
    res.status(200).json({user: {
        id:                 req.user._id,
        email:              req.user.email,
        name:               req.user.name,
        phoneNumber:        req.user.phoneNumber,
        address:            req.user.address,
        rewardsPoints:      req.user.rewardsPoints,
        profilePic:         req.user.profilePic,
        google_id:          req.user.google_id
    }});
});

router.post('/register', function(req, res) {
    const name = req.body.name;
    let email = req.body.email.toLowerCase();
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    console.log(req.body)

    // Validation
    req.checkBody('name', 'first name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('confirmPassword', 'passwords do not match').equals(req.body.password);
    req.checkBody('address', 'address is required').notEmpty();
    req.checkBody('phoneNumber', 'phone number is required').notEmpty();

    const errors = req.validationErrors();
    if(errors) {
        res.status(422).json({success: false, msg: 'Failed to register User', errors: errors});
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
                res.status(500).json({success: false, msg: 'Failed to register User', errors: err});
                console.log(err);
            } else {
                res.status(200).json({success: true, msg: 'User Registered', user});
            }
        });
    }
});

router.post('/forgotPassword', function(req, res, next){
    const { email } = req.body;

    User.generateResetPasswordToken(email, (err, token) => {
        if (err) {
            console.log(err)
            return res.status(422).json({ success: false, error: err })
        }

        sendEmail(email, token, res);
    })
});

const sendEmail = (email, token, res) => {
    const msg = {
        to: email,
        from: 'no-reply@getaway.io',
        templateId: 'd-4853abfeec304587bf0637296a6bbed3',
        personalizations: [
            {
                to: [
                    {
                        email: email
                    }
                ],
                dynamic_template_data: {
                    link: `http://localhost:3000/resetPassword/${token}`,
                    subject: 'Reset Password',
                }
            }
        ]
    };

    sgMail.send(msg)
    .then( () => {
        res.status(200).json({success: true, message: 'email sent'});
    })
    .catch((err) => {
        res.status(422).json({success: false, error: err});
    });
}

router.post('/resetPassword', function(req, res) {
    const { token, confirmPassword, password } = req.body;
    if (!(password === confirmPassword && password.length > 7 && confirmPassword.length > 7)) {
        return res.status(422).json({success: false, message: 'invalid credentials'})
    }
    User.resetPassword({token, password}, (err, user) => {
        if(err) return res.status(422).json({success: false, error: err})
        res.status(200).json({success: true, user, message: 'password changed'});
    });
    
});

router.post('/login', (req, res, next) => {
    console.log(req.body);
    const email = req.body.email.toLowerCase();

    const password = req.body.password;

    User.getUserByEmail(email, function(err, user){
        if (err) throw err;
        if(!user){
            return res.status(500).json({success: false, msg: 'User with that email does not exist'})
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
                return res.status(500).json({success: false, msg: 'Password is incorrect'});
            }
        });
    });
});

router.post('/edit-profile', async (req, res) => {
    let { email, newPhoneNumber, newAddress, file  } = req.body;
    
    try {
        if (file.length) {
            cloudinary.v2.uploader.upload(file, async (error, result) => {
                try {
                    let user = await User.findOneAndUpdate(
                        { email }, {
                            phoneNumber: newPhoneNumber,
                            address: newAddress,
                            profilePic: result.secure_url
                        }).exec();
                    
                    user.phoneNumber = newPhoneNumber;
                    user.address = newAddress;
                    user.profilePic = result.secure_url;

                    return res.status(200).json({
                        success: true,
                        msg: 'Successfully edited user\'s profile!',
                        user
                    });
                }
                catch(err) {
                    return res.status(400).json({
                        success: false,
                        msg: 'Error from server!',
                        err
                    });
                }
            })
        } else {
            let user = await User.findOneAndUpdate(
                { email }, {
                    phoneNumber: newPhoneNumber,
                    address: newAddress
                }).exec();
            
            user.phoneNumber = newPhoneNumber;
            user.address = newAddress;

            return res.status(200).json({
                success: true,
                msg: 'Successfully edited user\'s profile!',
                user
            });
        }
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            msg: 'Error from server!',
            err
        });
    }
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
