const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/ReactProjectCustomerDataBase')
    .then((x) => console.log('Connected to mongo db'))
    .catch(() => console.log('Problem with mongo db'));
