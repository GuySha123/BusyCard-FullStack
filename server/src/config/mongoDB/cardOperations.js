const cardModel = require('../../models/mongoDB/card-model');

async function createCardInMongoDB(cardDetails) {
    try {
        const createdCardInDB = await new cardModel(cardDetails).save();
        return createdCardInDB;
    } catch {
        return null;
    }
}

async function getAllCards() {
    try {
        const cards = await cardModel.find();
        return cards;
    } catch {
        return null;
    }
}

async function deleteOneCardById(cardid, userid) {
    try {
        return await cardModel.findOneAndDelete({
            _id: cardid,
            userId: userid,
        });
    } catch {
        return null;
    }
}

async function getCardsByUserId(idOfUSer) {
    try {
        const cardsOfThatUser = await cardModel.find({ userId: idOfUSer });
        return cardsOfThatUser;
    } catch {
        return null;
    }
}

async function getOneCardbyUserIDAndCardID(userId, cardId) {
    try {
        const oneCard = await cardModel.find({
            userId: userId,
            _id: cardId,
        });
        return oneCard;
    } catch {
        return null;
    }
}

async function updateOneCard(userId, cardId, cardUpdatedData) {
    try {
        const filter = {
            _id: cardId,
            userId: userId,
        };
        return await cardModel.findByIdAndUpdate(filter, cardUpdatedData);
    } catch {
        return null;
    }
}

module.exports = {
    createCardInMongoDB,
    getAllCards,
    deleteOneCardById,
    getCardsByUserId,
    getOneCardbyUserIDAndCardID,
    updateOneCard,
};
