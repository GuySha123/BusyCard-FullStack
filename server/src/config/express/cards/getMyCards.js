const cardOperations = require('../../mongoDB/cardOperations');

async function getMyCards(req, res) {
    const userCards = await cardOperations.getCardsByUserId(req.userID);
    res.json(userCards);
}

module.exports = getMyCards;
