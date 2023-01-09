const joi = require('joi');

const schema = joi.object({
    email: joi.string().required().email().min(6),
    password: joi.string().required().min(6),
    firstName: joi.string().required().min(2),
    lastName: joi.string().required().min(2),
    isBusinessAccount: joi.boolean().required(),
    isAdminAccount: joi.boolean().required(),
});

function validateRegisterCustomer(customer) {
    return schema.validate(customer);
}

module.exports = validateRegisterCustomer;
