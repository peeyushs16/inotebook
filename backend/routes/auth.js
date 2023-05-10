const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Peeyushisagoodboy";

router.post('/',[
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter valid email').isEmail(),
    body('password').isLength({min:5}),
], async (req, res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({error : error.array()});
    }
    
    try{
        
        let user = await User.findOne({email : req.body.email});
        if(user){
        return res.status(400).json({'error' : 'Email already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        secpwd = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name :req.body.name,
            email :req.body.email,
            password :secpwd,
        })
        res.json(user);   
     }catch (error){
        console.log(error.message);
        res.status(500).send("Error found try again");
    }
})
module.exports = router;