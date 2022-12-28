//const customerOperations = require('../../config/mongoDB/customerOperations');
const jsonwebtoken = require('jsonwebtoken');

async function authenticateCustomer(req, res, next) {
    const token = req.headers.token;
    if (!token)
        return res.status(401).json({ message: 'Token was not provide' });

    try {
        const data = jsonwebtoken.verify(token, 'mykey');
        req.userId = data.customerId;
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authenticateCustomer;
