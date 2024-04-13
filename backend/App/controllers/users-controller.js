const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const _ = require('lodash')

const { validationResult } = require('express-validator')

const usersCltr = {}

const OTP_LENGTH = 6
const OTP_CONFIG = {
    digits: true,
    lowerCaseAlphabets: false,
    UpperCaseAlphabets: false,
    specialChars: false
}

const generateOTP = () => {
    const otp = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG)
    return otp
}

const sendMail = (userMail, otp) => {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    })


    const html = `<p><b>Hi</br> Thank you for registering to post app,</b> Your otp is ${otp}</p>`
    async function sendMail() {
        const info = await transport.sendMail({
            from: 'hemaswathi2002@gmail.com', // Sender address
            to: userMail, // List of recipients
            subject: 'Registration Confirmation', // Subject line
            html: html,
        })
    }
    sendMail().catch(console.error)
}

usersCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { body } = req
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password, salt)
        user.password = encryptedPassword

        const otp = generateOTP()
        user.otp = otp
        sendMail(user.email, user.otp)
        const count = await User.countDocuments()
        if (count == 0) {
            user.role = 'admin'
        }
        else if (req.user.role == 'owner') {
            user.role = 'customer'
        } else {
            user.role = 'owner'
        }
        const response = await user.save()
        res.status(201).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal Server Error' })
    }
}

usersCltr.verify = async (req, res) => {
    const { body } = req
    try {
        const user = await User.findOne({ email: body.email })
        if (!user) {
            return res.status(404).json({ error: 'Record not found' })
        }
        if (user && user.otp != body.otp) {
            return res.status(400).json({ error: 'Invalid OTP' })
        }
        await User.findOneAndUpdate({ email: body.email }, { $set: { isVerified: true } }, { new: true })
        res.send('Email Verified')
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = _.pick(req.body, ['email', 'password'])
    try {
        const user = await User.findOne({ email: body.email })
        if (!user) {
            return res.status(404).json({ errors: 'Invalid email/password' })
        }
        const checkPassword = await bcryptjs.compare(body.password, user.password)
        if (!checkPassword) {
            return res.status(404).json({ errors: 'Invalid email/password' })
        }
        const tokenData = {
            id: user._id,
            role: user.role
        }
        console.log(tokenData)
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ token: token })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal Server Error' })
    }
}

usersCltr.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select({ password: 0 })
        console.log(user)
        res.json(user)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = usersCltr