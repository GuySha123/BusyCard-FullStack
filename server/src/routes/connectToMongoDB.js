const mongoose = require('mongoose');

const dbUrl =
    'mongodb+srv://guyshaleva:rYWl593puLygni1o@cluster0.qhwl6xr.mongodb.net/BusyCard?retryWrites=true&w=majority';

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(dbUrl, connectionParams)
    .then((x) => console.info('Connected to mongo DB'))
    .catch((e) => console.log('Error', e));
