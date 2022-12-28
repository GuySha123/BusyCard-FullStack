const operations = require('../../mongoDB/cardOperations');

/** @type {import("express").RequestHandler} **/
async function deleteOneCard(req, res) {
    const cardid = req.query.cardid;
    if (cardid) {
        const retVal = await operations.deleteOneCardById(cardid, req.userId);
        if (retVal != null) return res.json('Card deleted');
    }

    return res.status(500).json(`Card wasn't deleted `);
}

module.exports = deleteOneCard;
