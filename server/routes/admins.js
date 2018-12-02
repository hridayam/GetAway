const Admin = require('../models/admins');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        let admin = Admin.findOne({ username }).exec();

        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if (err) {
                throw new Error(err);
            } else {
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

module.exports = router;