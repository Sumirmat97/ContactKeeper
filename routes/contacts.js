const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../model/User');
const Contact = require('../model/Contact');
const { check, validationResult } = require('express-validator');

// @route   GET api/contacts
// @desc    Get all user conatcts 
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        let contact = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contact);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [ auth, 
    check('name', 'Please enter name of contact').not().isEmpty() ],
    async (req, res) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
    
        const {name, email, phone, type} = req.body;
        try {
            let newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            let contact = await newContact.save();
            res.json(contact);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    
    const {name, email, phone, type} = req.body;

    let contactFields = {}
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try{
        let existingContact = await Contact.findById(req.params.id);

        if(!existingContact) {
            return res.status(404).json({msg: "Contact not found"});
        }

        //Make sure user owns contact
        if(existingContact.user.toString() != req.user.id) {
            return res.status(401).json({msg: "Not authorized" });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            {$set: contactFields},
            {new: true});

        res.json(contact);
    } catch(error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {

    try{
        let existingContact = await Contact.findById(req.params.id);

        if(!existingContact) {
            return res.status(404).json({msg: "Contact not found"});
        }

        //Make sure user owns contact
        if(existingContact.user.toString() != req.user.id) {
            return res.status(401).json({msg: "Not authorized" });
        }

        contact = await Contact.findByIdAndDelete(req.params.id);

        res.send("Contact Deleted");
    } catch(error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;