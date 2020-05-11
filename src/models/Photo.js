const {model, Schema} =  require('mongoose');

const PhotoShema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    description: String,
    direction: {
        province: String,
        canton: String,
        district: String,
        place: String
    },
    user_id:{ type: Schema.ObjectId , ref: 'User', require: true },
    likes: Array,
    public_id: String
},{
    timestamps: true 
});


module.exports =  model('Photo', PhotoShema);