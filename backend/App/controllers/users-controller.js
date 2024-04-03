const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const {validationResult} = require('express-validator')

const usersCltr = {}

usersCltr.register = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {body} = req
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password,salt)
        user.password = encryptedPassword
        const count = await User.countDocuments()
        if(count == 0){
            user.role = 'admin'
        }
        else if (user.role == 'owner'){
            user.role = 'owner'
        }
        else {
            user.role = 'customer'
        }
        const response = await user.save()
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

usersCltr.login = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['mobile','password'])
    try{
        const user = await User.findOne({mobile:body.mobile})
        if(!user){
            return res.status(404).json({errors:'Invalid mobile/password'})
        }
        const checkPassword = await bcryptjs.compare(body.password,user.password)
            if(!checkPassword){
                return res.status(404).json({errors:'Invalid mobile/password'})
            }     
            const tokenData = {
                id : user._id,
                role : user.role
            }
            console.log(tokenData)
            const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn : '7d'})
            res.json({token:token})
        }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

usersCltr.account = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select({password:0})
        console.log(user)
        res.json(user)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = usersCltr