const userOperations = require('../../mongoDB/customerOperations');

/** @type {import("express").RequestHandler} **/
async function updateUser(req, res) {
    const updateid = req.query.updateid;
    const dataToUpdateUser = req.body;

    if (!dataToUpdateUser)
        return res.status(400).json('Please provide info to update');

    if (!updateid) return res.status(400).json('Id was not provided');

    const resultFromDb = await userOperations.updateUserData(
        updateid,
        dataToUpdateUser
    );
    console.log(resultFromDb);

    if (resultFromDb == null) return res.status(500).json('Server Error');
    return res.json(resultFromDb);
}

module.exports = updateUser;
