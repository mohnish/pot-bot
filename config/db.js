const mongooseConnection = require('mongoose');
mongooseConnection.connect(process.env.MONGO_SRV)
module.exports = mongooseConnection;
