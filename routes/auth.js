const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../model/User');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {

    try{
        let user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post('/', [
    check('email', "Please include a valid email").isEmail(),
    check('password', "Password is required").exists()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        
        const {email, password} = req.body;

        user = await User.findOne({email});
        if (!user) {
            return res.status(400).send({msg: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).send({msg: "Invalid Credentials"});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (error, token) => {
            if(error) {
                throw error;
            }
            res.json({token}); 
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;