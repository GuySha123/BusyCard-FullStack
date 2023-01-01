const cardOperations = require('../../mongoDB/cardOperations');

async function getMyCards(req, res) {
    const userCards = await cardOperations.getCardsByUserId(req.userId);
    res.json(userCards);
}

module.exports = getMyCards;
