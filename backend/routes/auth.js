const express = require('express')
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser.js')
const JWT_SECRET = 'P@$$vvOrd'

// ROUTE 1: create a user using POST Method "/api/auth/createanewuser" doesn't require auth
router.post('/createnuser', [// Checking Valid Value or giving Msg To User
    body('name', 'Name cannot be blank').isLength({ min: 0 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Passwoed must be greater than 5').isLength({ min: 5 })
], async (req, res) => { 
    const errors = validationResult(req);
    let success = false
    // Try After Error
    try {
        // If err send json
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Checking Email in db or not
        let user = await User.findOne({ email: req.body.email })
        // if yes
        if (user) {
            // return this
            success = false
            return res.status(400).json({success, error: "Sorry A User with this email already exists" })
        }

        const salt = await bcryptjs.genSalt(10)
        const secPass = await bcryptjs.hash(req.body.password, salt)

        // if not then creating user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(authToken)
        // sending user to json response or to user
        success = true
        res.json({success,  authToken })
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Some Error Occured")
    }
})

//ROUTE 2: Authenthicate an user using "/api/auth/login"

router.post('/login', [// Checking Valid Value or giving Msg To User
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Passwoed can not be less than 5 chracters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    let success = false
    // If err then send json
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({success, error: "Please try to login with right credentials" })
        }
        const passwordcompare = await bcryptjs.compare(password, user.password)

        if (!passwordcompare) {
            success = false
            return res.status(400).json({success, error: "Please try to login with right credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({success, authToken })
    } catch (e) {
        console.error(e.message)
        res.status(500).send(" Error Occured")
    }
})


// ROUTE 3: GEETING USER information using POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findOne({userId}).select("-password")
        res.send(user)
    } catch (e) {
        console.error(e.message)
        res.status(500).send(" Error Occured")
    }
})


module.exports = router