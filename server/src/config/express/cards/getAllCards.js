const operations = require('../../mongoDB/cardOperations');

/** @type {import("express").RequestHandler} **/
async function getAllCards(req, res) {
    const cards = await operations.getAllCards();
    res.json(cards);
}

module.exports = getAllCards;
