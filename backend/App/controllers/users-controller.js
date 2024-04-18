const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const _ = require('lodash')

const { validationResult } = require('express-validator')

const usersCltr = {}

const OTP_LENGTH = 4
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
        // host: 'smtp.gmail.com',
        host : 'smtp.mailtrap.io',
        port : 2525,
        // port: 465,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    })


    const html = `<p><b>Hi</br> Thank you for registering to post app,</b> Your otp is ${otp}</p>`
    async function sendMail() {
        const info = await transport.sendMail({
            from: 'sender@example.com', // Sender address
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

        const otp = generateOTP().toString();
        user.otp = otp
        await sendMail(user.email, user.otp)
        const count = await User.countDocuments()
        if (count == 0) {
            user.role = 'admin'
        }
        else if (user.role == 'owner') {
            user.role = 'owner'
        } else {
            user.role = 'customer'
        }
        const response = await user.save()
        res.status(201).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal Server Error' })
    }
}

// usersCltr.verifyEmail = async (req, res) => {
//     const { body } = req
//     try {
//         const user = await User.findOne({ email: body.email })
//         if (!user) {
//             return res.status(404).json({ error: 'Record not found' })
//         }
//         if (user && user.otp != body.otp) {
//             return res.status(400).json({ error: 'Invalid OTP' })
//         }
//         await User.findOneAndUpdate({ email: body.email }, { $set: { isVerified: true } }, { new: true })
//         res.send('Email Verified')
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// }

usersCltr.verifyEmail = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() })
    }
    const { email, otp } = req.body
    try {
        const user = await User.findOneAndUpdate({ email: email, otp: otp }, { $set: { isverified: true } }, { new: true })
        console.log(user)
        if (!user) {
            return res.status(401).json("Invalid otp")
        }
        res.status(201).json("email verified")
    } catch (err) {
        console.error("Error verifying email:", err);
        res.status(500).json({ error: "Internal Server Error" })
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
            return res.status(401).json({ errors: 'Invalid email/password' })
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

usersCltr.updatePassword=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.user.id
    const data=_.pick(req.body,["oldPassword","newPassword","changePassword"])
    try{
        const user = await User.findOne({_id:id})
        if(!user){
            return res.status(401).json({error:"user not found"})
        }
        const result= await bcryptjs.compare(data.oldPassword,user.password,)
        if(!result){
            return res.status(401).json({error:"your old password is not matching"})
        }
        if(data.newPassword==data.changePassword){
            const salt=await bcryptjs.genSalt()
            const hashPassword=await bcryptjs.hash(data.newPassword,salt)
           const response=await User.findOneAndUpdate({_id:req.user.id},{password:hashPassword},{new:true})
           return res.status(200).json(response)
        }else{
            return  res.status(401).json({error:" new password are not matching"})       
        }
    }catch(err){
        console.log(err)

    }
}

usersCltr.forgotPassword=async(req,res)=>{
    const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(402).json({errors:errors.array()})
    // }
    const {email}=_.pick(req.body,["email"])
    try{
        const user=await User.findOne({email:email})
        if(!user){
            return res.status(401).json({error:"email not found"})
        }
        const otp=generateOtp()
        const response=await User.findOneAndUpdate({email:email},{otp:otp},{new:true})
        sendMail({
            email: user.email,
            subject: "EVENT_SPOT@ <support> Password Change",
            text: `set password with otp ${otp}
             don't share otp to any one`
        })
        res.status(201).json({ status: "success", msg: "sent success " })
    }catch(err){
    console.log(err)
    }
}

usersCltr.forgotPassword = async(req,res)=>{

    const {email} = _.pick(req.body,['email'])
    try{
        const  user = await user.findOne({email:email})
        if(!user){
            return res.statusS(401).json({error:"email not found"})
        }
        const otp=generateOTP()
        const response=await User.findOneAndUpdate({email:email},{otp:otp},{new:true})
        sendMail({
            email: user.email,
            subject: "EVENT_SPOT@ <support> Password Change",
            text: `set password with otp ${otp}
             don't share otp to any one`
        })
        res.status(201).json({ status: "success", msg: "sent success " })
    }
    catch(err){
        console.log(err)
    }
}

usersCltr.resetForgotPassword=async(req,res)=>{
    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(402).json({errors:errors.array()})
    // }
    const{email,otp,password}=_.pick(req.body,["email","otp","password"])
    try{
        const salt=await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(password,salt)
        const user=await User.findOneAndUpdate({email:email,otp:otp},{password:hashPassword},{new:true})
        res.status(201).json(user)
    }catch(err){
        console.log(err)
        res.status(501).json({error:"internal server error"})
    }
}

// usersCltr.remove=async(req,res)=>{
//     const id=req.params.id
//     try{
//        const user=await User.findOneAndDelete({_id:id})
//        res.json(user)
//     }catch(err){
//         res.status(401).json({error:"internal server errro"})
//     }
// }

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