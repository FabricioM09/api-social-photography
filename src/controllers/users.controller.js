const userCtrl = {};

const User = require('../models/User');
var validator = require('validator');
//const jwt = require('jsonwebtoken');
//const moment = require('moment');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

userCtrl.createUser = async (req, res) => {
    const {username, role, email, address, phone, description, userId} =  req.body; 
    
    const userNew = new User({
        username, role, email, address, phone, description, user: userId
    })

    try {
        await userNew.save()
        
    } catch (error) {
        return res.status(400).json({error});
    }

    res.status(200).json({message: "user created"})
}

userCtrl.setAvatarProfile = async (req, res) => {
    const imageurl = req.file.path
    let result

    try {
        result = await cloudinary.v2.uploader.upload(imageurl, {folder: 'social-photography/photo-profiles'});
        await User.updateOne({_id: req.params.id}, { imageUrl: result.url, public_id: result.public_id});
        await fs.unlink(imageurl);
    } catch (error) {
        return res.status(400).json({error:error})
    }

    res.status(200).json({message: "Image profile saved"})
}   

userCtrl.update = async (req, res) => {
    const {username, email,address, phone, description} = req.body;
    
  
    if(validator.isEmpty(username)){
        return res.status(200).json({message: "username it should not be empty"})
    }    

    try {
        await User.findOneAndUpdate({_id: req.params.id }, {
            username, email,address, phone, description
        });
    } catch (error) {
        return res.status(400).json({error})
    }

    res.status(200).json({message: "User updated"})
}

userCtrl.getOne = async (req, res) => {
    const user =  await User.findById(req.params.id)

    res.status(200).json({user})
}

userCtrl.getAll = async (req, res) => {
    const users = await User.find();
    
    res.status(200).json({users})
}

userCtrl.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
    } catch (error) {
       return res.status(400).json({error})
    }

    res.status(400).json({message: "User deleted"})
}

module.exports = userCtrl;