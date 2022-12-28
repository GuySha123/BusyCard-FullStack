const operations = require('../../mongoDB/customerOperations');

async function detailsOfCustomer(req, res) {
    const customer = await operations.getCustomerDetailsById(req.query.id);

    res.json(customer);
}
module.exports = detailsOfCustomer;
