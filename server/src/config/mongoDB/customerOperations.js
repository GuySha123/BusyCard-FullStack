const customerModel = require('../../models/mongoDB/users-model');
const bcryptjs = require('bcryptjs');

async function registerCustomer(customerDetails) {
    try {
        customerDetails.password = bcryptjs.hashSync(customerDetails.password);
        return await new customerModel(customerDetails).save();
    } catch {
        return null;
    }
}

async function signInCustomer(email, password) {
    try {
        const customerFromDB = await customerModel.findOne({ email: email });
        if (customerFromDB == null) return null;

        const result = bcryptjs.compareSync(password, customerFromDB.password);
        if (result) {
            return customerFromDB;
        }
        return null;
    } catch {
        return null;
    }
}

async function getCustomerDetailsById(id) {
    try {
        return await customerModel.findOne({ _id: id.trim() });
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function getAllCustomers() {
    try {
        return await customerModel.find();
    } catch {
        return null;
    }
}

async function deleteOneUserById(userid) {
    try {
        const deleteUser = await customerModel.deleteOne({
            _id: userid,
        });
        return deleteUser;
    } catch {
        return null;
    }
}

module.exports = {
    registerCustomer,
    signInCustomer,
    getCustomerDetailsById,
    getAllCustomers,
    deleteOneUserById,
};
