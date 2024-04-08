const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Surname: { type: String, required: true },
    Firstname: { type: String, required: true },
    Age: { type: Number, required: true },
    Profession: { type: String, required: true },
    Description: { type: String, required: true },
    Country: { type: String, required: true },
    City: { type: String, required: true }
});

module.exports = mongoose.model('Users', UserSchema);
