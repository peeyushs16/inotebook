const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Peeyushisagoodboy";

router.post('/createUser',[
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
        // res.json(user);
        
        const data = {
            user: {id: user.id}
        }

        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({authToken});

     }catch (error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})



// authenticate with login cred
router.post('/login',[
    body('email', 'Enter valid email').isEmail(),
    body('password', 'passwors cannot be blank').exists(),
], async (req, res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({error : error.array()});
    }
    
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({'error' : 'Invalid login details'});
        }

        const validatePwd = await bcrypt.compare(password, user.password)
        if(!validatePwd){
            return res.status(400).json({'error' : 'Invalid login details'});
        }

        const data = {
            user: {id: user.id}
        }

        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
   
})




// get login user details

router.post('/getuser',fetchuser, async (req, res)=>{
   

    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");

        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
   
})

module.exports = router;