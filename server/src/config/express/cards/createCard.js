const validateCreateCard = require('../../../controllers/validate/joi/validateCreateCard');
const operations = require('../../mongoDB/cardOperations');

/** @type {import("express").RequestHandler} **/
async function createCard(req, res) {
    const result = validateCreateCard(req.body);

    if (result.error) {
        return res.status(400).json(result.error.details[0].message);
    }

    req.body.userId = req.userId;
    const cardFromDB = await operations.createCardInMongoDB(req.body);

    if (cardFromDB == null) {
        return res.status(500).json('General error. The card is not saved');
    }

    res.json(cardFromDB);
}

module.exports = createCard;
