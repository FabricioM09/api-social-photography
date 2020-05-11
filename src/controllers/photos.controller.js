const photoCtrl = {}

const Photo = require('../models/Photo');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

photoCtrl.create = async (req, res) => {
    const { description, province, district,canton,place,userid } = req.body;
    const imageUrl = req.file.path;
    let result;
    

    try {
        result = await cloudinary.v2.uploader.upload(imageUrl, {folder: 'social-photography/photos'});
        const photoNew = new Photo({
            imageUrl: result.url,
            description, 
            userid,  
            direction:{ province,district,canton,place}, 
            public_id: result.public_id
        })
        await fs.unlink(imageUrl);
        await photoNew.save()
    } catch (error) {
        console.log(error)
        return res.status(400).json({error});
    }
    
    res.json({message: "Photo saved"})
}

photoCtrl.update = async (req, res) => {
    const { description, province, district,canton,place } = req.body;
    let photo;
    try {
        photo = await Photo.findOneAndUpdate({_id: req.params.id }, photo, {
        description, direction:{ province,district,canton,place}
    });
    } catch (error) {
        return res.status(400).json({error})
    }

    res.status(200).json({message: "Photo updated", photo})
}

photoCtrl.deletePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id); 
    
    try {
        await cloudinary.v2.uploader.destroy(photo.public_id);
        await Photo.findByIdAndDelete(req.params.id)
    } catch (error) {
       return res.status(400).json({error})
    }

    res.status(400).json({message: "photo deleted"})
}

photoCtrl.getOne = async (req, res) => {

    const photo =  await Photo.findById(req.params.id)

    res.status(200).json({photo})
}

photoCtrl.getAll = async (req, res) => {
    const photos = await Photo.find();
    
    res.status(200).json({photos})
}


module.exports = photoCtrl;