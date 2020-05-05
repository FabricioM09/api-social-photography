const User = require('../models/User')


const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_API_SECRET
});

/**if the user has an image it removes it from cloudinary */
async function  verifyPhoto (req, res, next)  {
   const user = await User.findById(req.params.id); 
   
   if(user.public_id){
        try {
            await cloudinary.v2.uploader.destroy(user.public_id);
        } catch (error) {
            return res.status(400).json({error})
        }
   }

   next();
}


module.exports = verifyPhoto;