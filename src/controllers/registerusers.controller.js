const registerUserCtrl = {};

const RegisterUser = require('../models/RegisterUser');

var validator = require('validator');
  
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

registerUserCtrl.login = (req, res) =>{

}

module.exports = registerUserCtrl;