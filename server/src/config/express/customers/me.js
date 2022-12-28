const operations = require('../../mongoDB/customerOperations');

async function me(req, res) {
    if (!req.userId)
        return res.status(401).json({ message: 'User ID was not provide' });

    try {
        const customer = await operations.getCustomerDetailsById(req.userId);
        res.json(customer);
    } catch {
        return res.status(401).json({ message: 'Invalid user ID' });
    }
}
module.exports = me;
