const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    email: String,
    address: String,
    phone: String,
    description: String,
    imageUrl: String,
    user: {
        type: Schema.ObjectId , ref: 'RegisterUser', require: true
    },
    public_id: String
},{
    timestamps: true  
});

module.exports =  model('User', UserSchema);