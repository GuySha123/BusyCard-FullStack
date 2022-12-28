const operations = require('../../mongoDB/customerOperations');
const validateRegisterCustomer = require('../../../controllers/validate/joi/validateRegisterCustomer');

async function registerCustomer(req, res) {
    const { error } = validateRegisterCustomer(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const retVal = await operations.registerCustomer(req.body);
    if (retVal == null) return res.json(`User not added`);

    res.json({
        id: retVal._id,
        email: retVal.email,
        password: retVal.email,
        firstName: retVal.firstName,
        lastName: retVal.lastName,
        isBusinessAccount: retVal.isBusinessAccount,
        isAdminAccount: retVal.isAdminAccount,
    });
}

console.log(registerCustomer);

module.exports = registerCustomer;
