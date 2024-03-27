const jwt = require('jsonwebtoken')
const authenticateUser = (req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({errors:'Token is required'})
    }
    try{
        const tokenData = jwt.verify(token,process.env.JWT_SECRET)
        console.log(tokenData)
        req.user = {
            id : tokenData.id,
            role : tokenData.role
        }
        console.log(req.user)
        next()
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:err.message})
    }
}

const authorizeUser = (permittedRoles)=>{
    return (req,res,next)=>{
        if(permittedRoles.includes(req.user.role)){
            next()
        }else{
            res.status(403).json({error:'You are not authorized to access'})
        }
    }
}

module.exports = {authenticateUser,authorizeUser}