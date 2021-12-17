const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest');
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
    }
);

module.exports = mongoose;