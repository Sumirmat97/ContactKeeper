const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../model/User');
const { check, validationResult } = require('express-validator');


// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', "Please add name").not().isEmpty(),
    check('email', "Please add valid email").isEmail(),
    check('password', "Please enter a password with atleast 6 characters").isLength({min: 6})
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{ 

        const {name, email, password} = req.body;

        let user = await User.findOne({email});
        if(user) {
            return res.status(400).send({msg: 'User already exists.'});
        }

        user = new User({
            name, email, password
        });

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
    } catch(error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }



});

module.exports = router;