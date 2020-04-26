const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const RegisterUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: String
    
},{
  timestamps: true  
});

RegisterUserSchema.methods.encryptPassword = async  (password) => { 
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

RegisterUserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

module.exports =  model('RegisterUser', RegisterUserSchema);