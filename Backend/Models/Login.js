const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const LoginSchema  = mongoose.Schema({
    email: { type : String, required: true, unique: true },
    password: { type : String, required:true}
},
{
    timestamps: true
});

LoginSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Login', LoginSchema)