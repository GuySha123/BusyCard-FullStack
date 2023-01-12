const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors());
const authenticateCustomer = require('../controllers/middlewares/authenticateCustomer');
//me
const me = require('../config/express/customers/me');
//Customers
const getAllCustomers = require('../config/express/customers/getAllCustomers');
const registerCustomer = require('../config/express/customers/registerCustomer');
const signinCustomer = require('../config/express/customers/signinCustomer');
const detailsOfCustomer = require('../config/express/customers/detailsOfCustomer');
const deleteOneUser = require('../config/express/customers/deleteOneUser');
//Cards
const createCard = require('../config/express/cards/createCard');
const getAllCards = require('../config/express/cards/getAllCards');
const deleteOneCard = require('../config/express/cards/deleteOneCard');
const getMyCards = require('../config/express/cards/getMyCards');
const getMyCardByUserAndCardId = require('../config/express/cards/getMyCardByUserAndCardId');
const updateCard = require('../config/express/cards/updateCard');
const updateUser = require('../config/express/customers/updateUserData');
const updateUserPasswordDb = require('../config/express/customers/updateUserPasswordDb');

server
    .get('/user', authenticateCustomer, me)
    .get('/customers', getAllCustomers)
    .post('/customers/register', registerCustomer)
    .post('/customers/signin', signinCustomer)
    .get('/customers/getmydetails', detailsOfCustomer)
    .put('/customers/updateuser', authenticateCustomer, updateUser)
    .delete('/customers/deletecustomer', deleteOneUser)
    .post('/cards/create', authenticateCustomer, createCard)
    .get('/cards', getAllCards)
    .delete('/cards/deletecard', authenticateCustomer, deleteOneCard)
    .get('/cards/getmycards', authenticateCustomer, getMyCards)
    .get('/cards/getmycardbyid', authenticateCustomer, getMyCardByUserAndCardId)
    .put('/cards/updatecard', authenticateCustomer, updateCard)

    .put(
        '/customers/updatepassword',
        authenticateCustomer,
        updateUserPasswordDb
    );

server.listen(5000, () => console.log('Express server listening'));
