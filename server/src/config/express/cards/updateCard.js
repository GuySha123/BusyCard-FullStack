const cardOperations = require('../../mongoDB/cardOperations');

/** @type {import("express").RequestHandler} **/
async function updateCard(req, res) {
    const cardid = req.query.cardid;
    const dataToUpdateFromUser = req.body;

    if (!dataToUpdateFromUser)
        return res.status(400).json('Please provide info to update');

    if (!cardid) return res.status(400).json('Id was not provided');

    const resultFromDb = await cardOperations.updateCardById(
        cardid,
        dataToUpdateFromUser
    );
    if (resultFromDb == null) return res.status(500).json('Server Error');
    return res.json(resultFromDb);
}

module.exports = updateCard;
