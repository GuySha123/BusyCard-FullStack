const cardOperations = require('../../mongoDB/cardOperations');

async function getMyCardByUserAndCardId(req, res) {
    const cardId = req.query.cardId;
    if (!cardId) return res.status(400).json(`Card id wasn't provided`);
    const card = await cardOperations.getOneCardbyUserIDAndCardID(
        req.userID,
        req.query.cardId
    );
    res.json(card);
}

module.exports = getMyCardByUserAndCardId;
