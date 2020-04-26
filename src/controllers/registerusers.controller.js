const registerUserCtrl = {};

const RegisterUser = require('../models/RegisterUser');

var validator = require('validator');
const jwt = require('jsonwebtoken');
const moment = require('moment');


registerUserCtrl.registerUser = async (req, res)  => {
    const {email, password } = req.body; 
    const user = new RegisterUser({
        email,
        password
    })

    if(!validator.isEmail(email)){
        return res.status(400).json({message: "The email is not valid"});
    }

    try {
        user.password = await user.encryptPassword(user.password);
        await user.save();
    } catch (error) {
        return res.status(400).json({error})
    }

    res.status(200).json({message: "Resgister completed"})
}

registerUserCtrl.login = async (req, res) =>{
    const { email, password} = req.body;
        
    if(!validator.isEmail(email)){
        return res.status(400).json({message: "The email is not valid"});
    }

    const user = await RegisterUser.findOne({email});

    if(!user){
        return res.status(400).json({message: "The user not exist"});
    }
    
    const validPassword = await user.validatePassword(password);
    if(!validPassword){
        return res.status(401).json({auth: false, token: null, message: "Invalid password"});
    }

    const token = jwt.sign({id: user._id}, process.env.mysecretkeyjwt, {
        expiresIn: moment().add(14, 'days').unix() 
    })

    res.json({auth: true, token});
}

module.exports = registerUserCtrl;