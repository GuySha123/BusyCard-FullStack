const operations = require('../../mongoDB/cardOperations');

/** @type {import("express").RequestHandler} **/
async function updateCard(req, res) {
    const cardID = req.query.cardid;
    const userID = req.userId;
    if (!cardID) {
        return res.status(400).json(`Card ID not provided`);
    }

    await operations.updateOneCard(cardID, userID, req.body);
    if (result != null) return res.json('Card updated');
    return res.status(500).json(`Server error card wasn't updated`);
}

module.exports = updateCard;
