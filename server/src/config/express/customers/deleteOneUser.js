const operations = require('../../mongoDB/customerOperations');

/** @type {import("express").RequestHandler} **/
async function deleteOneUser(req, res) {
    const result = await operations.deleteOneUserById(req.query.userid);
    if (result == null) {
        return res.status(500).json(`User wasn't deleted`);
    }

    return res.json(req.query.userid + ' User deleted from DB');
}

module.exports = deleteOneUser;
