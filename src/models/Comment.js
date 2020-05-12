const {model, Schema} =  require('mongoose');

const CommentShema = new Schema({
    content: {
        type: String,
        required: true
    },
    user_id:{ type: Schema.ObjectId , ref: 'User', require: true },
    photo_id: { type: Schema.ObjectId , ref: 'Photo', require: true }
},{
    timestamps: true 
});


module.exports =  model('Comment',CommentShema) ;