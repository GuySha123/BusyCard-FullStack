const operations = require('../../mongoDB/customerOperations');
const validateSigninCustomer = require('../../../controllers/validate/joi/validateSigninCustomer');
const jsonwebtoken = require('jsonwebtoken');

async function signinCustomer(req, res) {
    const { error } = validateSigninCustomer(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { email, password } = req.body;
    const retVal = await operations.signInCustomer(email, password);

    if (!retVal) return res.status(500).json('Email/Password incorrect');
    const token = jsonwebtoken.sign(
        {
            customerId: retVal._id,
            rememberMe: retVal.rememberMe,
        },
        'mykey'
    );
    return res.json(token);
}

module.exports = signinCustomer;
