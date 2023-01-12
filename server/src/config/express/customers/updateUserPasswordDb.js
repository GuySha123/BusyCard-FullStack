const userOperations = require('../../mongoDB/customerOperations');

/** @type {import("express").RequestHandler} **/
async function updateUserPasswordDb(req, res) {
    const userid = req.query.userid;
    const { password } = req.body;

    if (!password) return res.status(400).json('Please provide info to update');

    if (!userid) return res.status(400).json('Id was not provided');

    const resultFromDb = await userOperations.updateUserPassword(
        userid,
        password
    );
    if (resultFromDb == null) return res.status(500).json('Server Error');
    return res.json(resultFromDb);
}

module.exports = updateUserPasswordDb;
