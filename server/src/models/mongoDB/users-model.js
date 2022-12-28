const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    isBusinessAccount: Boolean,
    isAdminAccount: Boolean,
});

module.exports = mongoose.model('customer', customerSchema);
